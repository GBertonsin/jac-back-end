import { z } from "zod";
import { checkinByQrSchema, checkoutByQrSchema, geoCheckSchema } from "./checkins.schemas";

export type CheckinByQrDTO = z.infer<typeof checkinByQrSchema>;
export type CheckoutByQrDTO = z.infer<typeof checkoutByQrSchema>;
export type GeoCheckDTO = z.infer<typeof geoCheckSchema>;
