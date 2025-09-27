import type { Request, Response } from "express";
import { eventsService } from "./events.service";

export const eventsController = {
  create: async (req: any, res: Response) => {
    const ev = await eventsService.create(req.body, req.userId, req.userRole);
    res.status(201).json(ev);
  },

  list: async (_req: Request, res: Response) => {
    res.json(await eventsService.list());
  },

  get: async (req: Request, res: Response) => {
    const id = req.params.id
    if(!id){
      throw new Error("Missing event id")
    }
    const ev = await eventsService.get(id);
    res.json(ev);
  },

  update: async (req: any, res: Response) => {
    const ev = await eventsService.update(req.params.id, req.body, req.userRole);
    res.json(ev);
  },

  remove: async (req: any, res: Response) => {
    await eventsService.remove(req.params.id, req.userRole);
    res.status(204).end();
  }
};
