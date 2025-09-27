import { z } from "zod";
import { createEventSchema, updateEventSchema, idParamSchema } from "./events.schemas";

export type CreateEventDTO = z.infer<typeof createEventSchema>;
export type UpdateEventDTO = z.infer<typeof updateEventSchema>;
export type IdParamDTO = z.infer<typeof idParamSchema>;
