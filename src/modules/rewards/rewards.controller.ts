import type { Request, Response } from "express";
import { rewardsService } from "./rewards.service";

export const rewardsController = {
  create: async (req: any, res: Response) => {
    const reward = await rewardsService.create(req.body, req.userRole);
    res.status(201).json(reward);
  },

  list: async (_req: Request, res: Response) => {
    res.json(await rewardsService.list());
  },

  update: async (req: any, res: Response) => {
    const reward = await rewardsService.update(req.params.id, req.body, req.userRole);
    res.json(reward);
  },

  redeem: async (req: any, res: Response) => {
    const out = await rewardsService.redeem(req.params.id, req.userId);
    res.status(201).json(out);
  }
};
