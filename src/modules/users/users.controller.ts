import type { Request, Response } from "express";
import { usersService } from "./users.service";

export const usersController = {
  register: async (req: Request, res: Response) => {
    const out = await usersService.register(req.body as any);
    res.status(201).json(out);
  },
  login: async (req: Request, res: Response) => {
    const out = await usersService.login(req.body as any);
    res.json(out);
  }
};
