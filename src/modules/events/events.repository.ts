import { prisma } from "../../prisma";
import type { CreateEventDTO, UpdateEventDTO } from "./events.types";

export const eventsRepo = {
  create(data: CreateEventDTO, createdById: string) {
    return prisma.event.create({ data: { ...data, createdById } });
  },
  findMany() {
    return prisma.event.findMany({ where: { isActive: true }, orderBy: { startsAt: "asc" }});
  },
  findById(id: string) {
    return prisma.event.findUnique({ where: { id } });
  },
  update(id: string, data: UpdateEventDTO) {
    return prisma.event.update({ where: { id }, data });
  },
  softDelete(id: string) {
    return prisma.event.update({ where: { id }, data: { isActive: false }});
  },
  countActiveRegs(eventId: string) {
    return prisma.registration.count({ where: { eventId, status: "REGISTERED" } });
  }
};
