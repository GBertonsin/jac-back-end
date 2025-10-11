import type { Request, Response } from "express";
import { registrationsService } from "./registrations.service";

export const registrationsController = {
  registerOnEvent: async (req: any, res: Response) => {
    const { eventId } = req.params as { eventId: string };
    const reg = await registrationsService.registerOnEvent(req.userId, eventId);
    res.status(201).json({ registrationId: reg.id, qrToken: reg.qrToken });
  },

  listByEvent: async (req: any, res: Response) => {
    const { eventId } = req.params as { eventId: string };
    const list = await registrationsService.listByEvent(eventId, req.userId, req.userRole);
    res.json(list);
  },

  cancel: async (req: any, res: Response) => {
    const { id } = req.params as { id: string };
    const reg = await registrationsService.cancel(id, req.userId, req.userRole);
    res.json(reg);
  }
};
