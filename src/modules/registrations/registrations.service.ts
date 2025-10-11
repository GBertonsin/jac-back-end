import crypto from "crypto";
import { HttpError } from "../../core/http";
import { prisma } from "../../prisma";
import { registrationsRepo } from "./registrations.repository";

export const registrationsService = {
  async registerOnEvent(userId: string, eventId: string) {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event || !event.isActive) throw new HttpError(404, "Evento não encontrado");

    const existing = await registrationsRepo.findByUserAndEvent(userId, eventId);
    if (existing && existing.status === "REGISTERED") {
      throw new HttpError(409, "Você já está inscrito neste evento");
    }

    if (event.capacity) {
      const count = await registrationsRepo.countActiveByEvent(eventId);
      if (count >= event.capacity) throw new HttpError(400, "Capacidade esgotada");
    }

    const qrToken = crypto.randomBytes(16).toString("hex");
    return registrationsRepo.create(userId, eventId, qrToken);
  },

  async listByEvent(eventId: string, requesterId: string, requesterRole: string) {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new HttpError(404, "Evento não encontrado");

    // Apenas ADMIN/ORGANIZER ou o criador do evento pode listar
    if (!(["ADMIN", "ORGANIZER"].includes(requesterRole) || event.createdById === requesterId)) {
      throw new HttpError(403, "Sem permissão");
    }

    return registrationsRepo.listByEvent(eventId);
  },

  async cancel(registrationId: string, requesterId: string, requesterRole: string) {
    const reg = await registrationsRepo.findById(registrationId);
    if (!reg) throw new HttpError(404, "Inscrição não encontrada");
    // quem pode cancelar: o próprio inscrito, ADMIN, ORGANIZER ou criador do evento
    const isOwner = reg.userId === requesterId;
    const isEventCreator = reg.event.createdById === requesterId;
    const isAdminOrg = ["ADMIN", "ORGANIZER"].includes(requesterRole);

    if (!(isOwner || isEventCreator || isAdminOrg)) throw new HttpError(403, "Sem permissão");

    // se já cancelada, idempotente
    if (reg.status === "CANCELLED") return reg;

    return registrationsRepo.cancel(registrationId);
  }
};
