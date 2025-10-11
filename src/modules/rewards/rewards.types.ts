import { z } from "zod";
import { createRewardSchema, updateRewardSchema, idParamSchema } from "./rewards.schemas";

export type CreateRewardDTO = z.infer<typeof createRewardSchema>;
export type UpdateRewardDTO = z.infer<typeof updateRewardSchema>;
export type IdParamDTO = z.infer<typeof idParamSchema>;
