import { Router } from "express";
import { auth } from "../../core/auth";
import { validate } from "../../core/validate";
import { createRewardSchema, updateRewardSchema, idParamSchema } from "./rewards.schemas";
import { rewardsController } from "./rewards.controller";

const router = Router();

router.post("/", auth(["ADMIN","ORGANIZER"]), validate(createRewardSchema), rewardsController.create);
router.get("/", auth(), rewardsController.list);
router.put("/:id", auth(["ADMIN","ORGANIZER"]), validate(idParamSchema, "params"), validate(updateRewardSchema), rewardsController.update);
router.post("/:id/redeem", auth(), validate(idParamSchema, "params"), rewardsController.redeem);

export default router;
