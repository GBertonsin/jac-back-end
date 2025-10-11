import { prisma } from "../../prisma";

export const registrationsRepo = {
  create(userId: string, eventId: string, qrToken: string) {
    return prisma.registration.create({ data: { userId, eventId, qrToken } });
  },
  findByUserAndEvent(userId: string, eventId: string) {
    return prisma.registration.findUnique({
      where: { userId_eventId: { userId, eventId } }
    });
  },
  findById(id: string) {
    return prisma.registration.findUnique({ where: { id }, include: { event: true, user: true } });
  },
  listByEvent(eventId: string) {
    return prisma.registration.findMany({
      where: { eventId, status: "REGISTERED" },
      include: { user: true },
      orderBy: { createdAt: "asc" }
    });
  },
  cancel(id: string) {
    return prisma.registration.update({ where: { id }, data: { status: "CANCELLED" } });
  },
  countActiveByEvent(eventId: string) {
    return prisma.registration.count({ where: { eventId, status: "REGISTERED" } });
  },
  findByQrToken(qrToken: string) {
    return prisma.registration.findUnique({ where: { qrToken }, include: { event: true } });
  }
};
