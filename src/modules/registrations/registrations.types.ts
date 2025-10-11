import { z } from "zod";
import { eventIdParamSchema, idParamSchema, registerOnEventSchema, listQuerySchema } from "./registrations.schemas";

export type EventIdParamDTO = z.infer<typeof eventIdParamSchema>;
export type RegistrationIdParamDTO = z.infer<typeof idParamSchema>;
export type RegisterOnEventDTO = z.infer<typeof registerOnEventSchema>;
export type ListRegistrationsQueryDTO = z.infer<typeof listQuerySchema>;
