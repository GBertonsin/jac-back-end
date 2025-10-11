import { z } from "zod";

export const eventIdParamSchema = z.object({
  eventId: z.string().cuid()
});

export const idParamSchema = z.object({
  id: z.string().cuid()
});

export const registerOnEventSchema = z.object({
  // vazio por enquanto (vem do token), mas mantemos para evoluções futuras (ex.: campos adicionais)
});

export const listQuerySchema = z.object({
  // opcional: paginação futura
});
