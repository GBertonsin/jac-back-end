// src/modules/rewards/rewards.routes.ts
import { Router, Request, Response } from "express";
import { auth } from "../../core/auth";

const router = Router();

router.post("/", auth(["ADMIN", "ORGANIZER"]), (_req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented: create reward" });
});

router.get("/", auth(), (_req: Request, res: Response) => {
  return res.json([]);
});

router.post("/:id/redeem", auth(), (_req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented: redeem reward" });
});

router.put("/:id", auth(["ADMIN", "ORGANIZER"]), (_req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented: update reward" });
});

router.delete("/:id", auth(["ADMIN", "ORGANIZER"]), (_req: Request, res: Response) => {
  return res.status(204).end();
});

export default router;
