import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function auth(requiredRoles?: Array<"ADMIN"|"ORGANIZER"|"PARTICIPANT">) {
  return (req: any, res: Response, next: NextFunction) => {
    const hdr = req.headers.authorization;
    if (!hdr?.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });
    try {
      const payload: any = jwt.verify(hdr.slice(7), env.JWT_SECRET);
      req.userId = payload.sub;
      req.userRole = payload.role;
      if (requiredRoles && !requiredRoles.includes(req.userRole)) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}
