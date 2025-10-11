import { prisma } from "../../prisma";

export const checkinsRepo = {
  findOpenByRegistration(registrationId: string) {
    return prisma.checkin.findFirst({ where: { registrationId, exitedAt: null } });
  },
  create(registrationId: string, source: "QR" | "GEO", data?: { lat?: number; lng?: number; accuracyM?: number }) {
    return prisma.checkin.create({ data: { registrationId, source, lat: data?.lat, lng: data?.lng, accuracyM: data?.accuracyM } });
  },
  close(id: string, payload: { exitedAt: Date; staySeconds: number; lat?: number; lng?: number; accuracyM?: number }) {
    return prisma.checkin.update({ where: { id }, data: payload });
  }
};
