import type { Response } from "express";
import { checkinsService } from "./checkins.service";

// (opcional) sanity log pra você ver que o arquivo carregou
console.log("[checkins.controller] loaded");

export const checkinsController = {
  checkinByQr: async (req: any, res: Response) => {
    const out = await checkinsService.checkinByQr(req.userId, req.body.qrToken);
    res.status(201).json(out);
  },

  checkoutByQr: async (req: any, res: Response) => {
    const out = await checkinsService.checkoutByQr(req.userId, req.body.qrToken);
    res.json(out);
  },

  checkinByGeo: async (req: any, res: Response) => {
    const out = await checkinsService.checkinByGeo(req.userId, req.body);
    res.status(201).json(out);
  },

  checkoutByGeo: async (req: any, res: Response) => {
    const out = await checkinsService.checkoutByGeo(req.userId, req.body);
    res.json(out);
  },
};
