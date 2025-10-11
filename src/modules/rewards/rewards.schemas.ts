import { z } from "zod";

export const createRewardSchema = z.object({
  title: z.string().min(2),
  details: z.string().optional(),
  costPoints: z.number().int().positive(),
  stock: z.number().int().nonnegative().default(0),
  active: z.boolean().default(true)
});

export const updateRewardSchema = createRewardSchema.partial();

export const idParamSchema = z.object({
  id: z.string().cuid()
});
