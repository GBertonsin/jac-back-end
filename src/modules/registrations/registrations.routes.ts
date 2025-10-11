import { Router } from "express";
import { auth } from "../../core/auth";
import { validate } from "../../core/validate";
import { eventIdParamSchema, idParamSchema } from "./registrations.schemas";
import { registrationsController } from "./registrations.controller";

const router = Router();

// Inscrever no evento
router.post("/events/:eventId/register",
  auth(), validate(eventIdParamSchema, "params"),
  registrationsController.registerOnEvent
);

// Listar inscrições de um evento (criador/organizer/admin)
router.get("/events/:eventId/registrations",
  auth(), validate(eventIdParamSchema, "params"),
  registrationsController.listByEvent
);

// Cancelar inscrição (próprio usuário / criador / admin/org)
router.delete("/:id",
  auth(), validate(idParamSchema, "params"),
  registrationsController.cancel
);

export default router;
