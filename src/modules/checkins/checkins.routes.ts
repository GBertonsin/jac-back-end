import { Router } from "express";
import { auth } from "../../core/auth";
import { validate } from "../../core/validate";
import { checkinByQrSchema, checkoutByQrSchema, geoCheckSchema } from "./checkins.schemas";
import { checkinsController } from "./checkins.controller"; // <-- import NOMEADO

const router = Router();

router.post("/qr/checkin",  auth(), validate(checkinByQrSchema),  checkinsController.checkinByQr);
router.post("/qr/checkout", auth(), validate(checkoutByQrSchema), checkinsController.checkoutByQr);

router.post("/geo/checkin",  auth(), validate(geoCheckSchema), checkinsController.checkinByGeo);
router.post("/geo/checkout", auth(), validate(geoCheckSchema), checkinsController.checkoutByGeo);

export default router; // <-- export DEFAULT do router
