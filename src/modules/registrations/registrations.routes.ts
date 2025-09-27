// src/modules/registrations/registrations.routes.ts
import { Router, Request, Response } from "express";
import { auth } from "../../core/auth";

const router = Router();

router.post("/", auth(), (_req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented: create registration" });
});

router.get("/event/:eventId", auth(["ORGANIZER", "ADMIN"]), (_req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented: list registrations by event" });
});

router.get("/me", auth(), (_req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented: list my registrations" });
});

router.delete("/:id", auth(), (_req: Request, res: Response) => {
  return res.status(501).json({ message: "Not implemented: cancel registration" });
});

export default router;
