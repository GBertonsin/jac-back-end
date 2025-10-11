import { HttpError } from "../../core/http";
import { checkinsRepo } from "./checkins.repository";
import { registrationsRepo } from "../registrations/registrations.repository";
import { prisma } from "../../prisma";

function insideGeofence(lat: number, lng: number, ev: any) {
  if (!ev.geofenceLat || !ev.geofenceLng || !ev.geofenceRadiusM) return false;
  const R = 6371000;
  const toRad = (d: number) => d * Math.PI / 180;
  const dLat = toRad(lat - ev.geofenceLat);
  const dLng = toRad(lng - ev.geofenceLng);
  const a = Math.sin(dLat/2) ** 2 + Math.cos(toRad(ev.geofenceLat)) * Math.cos(toRad(lat)) * Math.sin(dLng/2) ** 2;
  const dist = 2 * R * Math.asin(Math.sqrt(a));
  return dist <= ev.geofenceRadiusM;
}

async function grantPointsIfEligible(reg: any, staySeconds: number) {
  const minutes = Math.floor(staySeconds / 60);
  const ev = reg.event;
  if (ev.pointsReward > 0 && minutes >= (ev.minStayMinutes ?? 0)) {
    await prisma.$transaction([
      prisma.pointsLedger.create({
        data: { userId: reg.userId, delta: ev.pointsReward, reason: "EVENT_CHECKIN", refType: "Event", refId: ev.id }
      }),
      prisma.user.update({ where: { id: reg.userId }, data: { points: { increment: ev.pointsReward } } })
    ]);
  }
}

export const checkinsService = {
  async checkinByQr(userId: string, qrToken: string) {
    const reg = await registrationsRepo.findByQrToken(qrToken);
    if (!reg || reg.status !== "REGISTERED") throw new HttpError(400, "Inscrição inválida");
    if (reg.userId !== userId) throw new HttpError(403, "QR não pertence ao usuário");

    const open = await checkinsRepo.findOpenByRegistration(reg.id);
    if (open) throw new HttpError(409, "Já existe um check-in em aberto");

    return checkinsRepo.create(reg.id, "QR");
  },

  async checkoutByQr(userId: string, qrToken: string) {
    const reg = await registrationsRepo.findByQrToken(qrToken);
    if (!reg) throw new HttpError(400, "Inscrição inválida");
    if (reg.userId !== userId) throw new HttpError(403, "QR não pertence ao usuário");

    const open = await checkinsRepo.findOpenByRegistration(reg.id);
    if (!open) throw new HttpError(409, "Nenhum check-in aberto");

    const exitedAt = new Date();
    const staySeconds = Math.max(0, Math.floor((exitedAt.getTime() - new Date(open.enteredAt).getTime()) / 1000));
    const updated = await checkinsRepo.close(open.id, { exitedAt, staySeconds });

    await grantPointsIfEligible(reg, staySeconds);
    return updated;
  },

  async checkinByGeo(userId: string, input: { eventId: string; lat: number; lng: number; accuracyM?: number }) {
    const reg = await prisma.registration.findFirst({
      where: { eventId: input.eventId, userId, status: "REGISTERED" },
      include: { event: true }
    });
    if (!reg) throw new HttpError(400, "Inscrição inválida");

    if (reg.event.requireGeo && !insideGeofence(input.lat, input.lng, reg.event)) {
      throw new HttpError(403, "Fora da área do evento");
    }

    const open = await checkinsRepo.findOpenByRegistration(reg.id);
    if (open) throw new HttpError(409, "Já existe um check-in em aberto");

    return checkinsRepo.create(reg.id, "GEO", { lat: input.lat, lng: input.lng, accuracyM: input.accuracyM });
  },

  async checkoutByGeo(userId: string, input: { eventId: string; lat: number; lng: number; accuracyM?: number }) {
    const reg = await prisma.registration.findFirst({
      where: { eventId: input.eventId, userId, status: "REGISTERED" },
      include: { event: true }
    });
    if (!reg) throw new HttpError(400, "Inscrição inválida");

    const open = await checkinsRepo.findOpenByRegistration(reg.id);
    if (!open) throw new HttpError(409, "Nenhum check-in aberto");

    const exitedAt = new Date();
    const staySeconds = Math.max(0, Math.floor((exitedAt.getTime() - new Date(open.enteredAt).getTime()) / 1000));
    const updated = await checkinsRepo.close(open.id, {
      exitedAt, staySeconds, lat: input.lat, lng: input.lng, accuracyM: input.accuracyM
    });

    await grantPointsIfEligible(reg, staySeconds);
    return updated;
  }
};
