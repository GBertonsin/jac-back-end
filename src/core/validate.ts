import { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export function validate(schema: ZodSchema, where: "body"|"query"|"params"="body"){
  return (req: Request, _res: Response, next: NextFunction) => {
    (req as any)[where] = schema.parse((req as any)[where]);
    next();
  };
}
