import { prisma } from "../../prisma";
export const usersRepo = {
  create(data: { name:string; email:string; passwordHash:string; role?: "ADMIN"|"ORGANIZER"|"PARTICIPANT" }) {
    return prisma.user.create({ data: { ...data, role: data.role ?? "PARTICIPANT" } });
  },
  findByEmail(email: string){
    return prisma.user.findUnique({ where: { email } });
  }
};
