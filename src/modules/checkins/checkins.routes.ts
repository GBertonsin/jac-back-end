// src/modules/checkins/checkins.routes.ts
import { Router, Request, Response } from "express";
import { auth } from "../../core/auth";

const router = Router();

router.post("/qr/checkin", auth(), (_req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented: QR check-in" });
});

router.post("/qr/checkout", auth(), (_req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented: QR check-out" });
});

router.post("/geo/checkin", auth(), (_req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented: GEO check-in" });
});

router.post("/geo/checkout", auth(), (_req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented: GEO check-out" });
});

export default router;
