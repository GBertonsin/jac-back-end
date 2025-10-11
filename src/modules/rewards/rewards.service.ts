import { HttpError } from "../../core/http";
import { prisma } from "../../prisma";
import { rewardsRepo } from "./rewards.repository";
import type { CreateRewardDTO, UpdateRewardDTO } from "./rewards.types";

export const rewardsService = {
  async create(data: CreateRewardDTO, role: string) {
    if (!["ADMIN","ORGANIZER"].includes(role)) throw new HttpError(403, "Sem permissão");
    return rewardsRepo.create(data);
  },

  list() {
    return rewardsRepo.listActive();
  },

  async update(id: string, data: UpdateRewardDTO, role: string) {
    if (!["ADMIN","ORGANIZER"].includes(role)) throw new HttpError(403, "Sem permissão");
    await rewardsService.get(id);
    return rewardsRepo.update(id, data);
  },

  async get(id: string) {
    const reward = await rewardsRepo.findById(id);
    if (!reward) throw new HttpError(404, "Recompensa não encontrada");
    return reward;
  },

  async redeem(rewardId: string, userId: string) {
    const reward = await rewardsService.get(rewardId);
    if (!reward.active) throw new HttpError(400, "Recompensa inativa");
    if (reward.stock <= 0) throw new HttpError(400, "Sem estoque");

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new HttpError(404, "Usuário não encontrado");
    if (user.points < reward.costPoints) throw new HttpError(400, "Pontos insuficientes");

    await prisma.$transaction([
      prisma.redemption.create({ data: { userId, rewardId, status: "REQUESTED" } }),
      prisma.pointsLedger.create({ data: { userId, delta: -reward.costPoints, reason: "REDEMPTION", refType: "Reward", refId: rewardId } }),
      prisma.user.update({ where: { id: userId }, data: { points: { decrement: reward.costPoints } } }),
      prisma.reward.update({ where: { id: rewardId }, data: { stock: { decrement: 1 } } })
    ]);

    return { ok: true };
  }
};
