import { Router } from "express";
import { validate } from "../../core/validate";
import { loginSchema, registerSchema } from "./users.schemas";
import { usersController } from "./users.controller";

const router = Router();

router.post("/register", validate(registerSchema), usersController.register);
router.post("/login", validate(loginSchema), usersController.login);

export default router;
