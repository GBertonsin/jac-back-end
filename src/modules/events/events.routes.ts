import { Router } from "express";
import { auth } from "../../core/auth";
import { validate } from "../../core/validate";
import { createEventSchema, updateEventSchema, idParamSchema } from "./events.schemas";
import { eventsController } from "./events.controller";

const router = Router();

router.post("/", auth(["ORGANIZER","ADMIN"]), validate(createEventSchema), eventsController.create);
router.get("/", auth(), eventsController.list);
router.get("/:id", auth(), validate(idParamSchema, "params"), eventsController.get);
router.put("/:id", auth(["ORGANIZER","ADMIN"]), validate(idParamSchema, "params"), validate(updateEventSchema), eventsController.update);
router.delete("/:id", auth(["ORGANIZER","ADMIN"]), validate(idParamSchema, "params"), eventsController.remove);

export default router;
