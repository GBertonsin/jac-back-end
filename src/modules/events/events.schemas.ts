import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
  locationName: z.string().optional(),
  address: z.string().optional(),
  requireGeo: z.boolean().default(false),
  geofenceLat: z.number().optional(),
  geofenceLng: z.number().optional(),
  geofenceRadiusM: z.number().int().positive().optional(),
  minStayMinutes: z.number().int().nonnegative().default(0),
  pointsReward: z.number().int().nonnegative().default(0),
  capacity: z.number().int().positive().optional(),
});

export const updateEventSchema = createEventSchema.partial();

export const idParamSchema = z.object({ id: z.string().cuid() });
