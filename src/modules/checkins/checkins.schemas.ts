import { z } from "zod";

export const checkinByQrSchema = z.object({
  qrToken: z.string().min(10)
});

export const checkoutByQrSchema = checkinByQrSchema;

export const geoCheckSchema = z.object({
  eventId: z.string().cuid(),
  lat: z.number(),
  lng: z.number(),
  accuracyM: z.number().optional()
});
