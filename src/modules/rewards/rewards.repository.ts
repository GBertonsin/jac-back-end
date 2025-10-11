import { prisma } from "../../prisma";
import type { CreateRewardDTO, UpdateRewardDTO } from "./rewards.types";

export const rewardsRepo = {
  create(data: CreateRewardDTO) {
    return prisma.reward.create({ data });
  },
  listActive() {
    return prisma.reward.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } });
  },
  findById(id: string) {
    return prisma.reward.findUnique({ where: { id } });
  },
  update(id: string, data: UpdateRewardDTO) {
    return prisma.reward.update({ where: { id }, data });
  }
};
