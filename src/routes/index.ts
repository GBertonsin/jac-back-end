import { Router } from "express";
import users from "../modules/users/users.routes";
import swaggerDocument from "../config/swagger-output.json";
import events from "../modules/events/events.routes";
import registrations from "../modules/registrations/registrations.routes";
import checkins from "../modules/checkins/checkins.routes";
import rewards from "../modules/rewards/rewards.routes";
import swaggerUi from 'swagger-ui-express'

const router = Router();
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use("/users", users);
router.use("/events", events);
router.use("/registrations", registrations);
router.use("/checkins", checkins);
router.use("/rewards", rewards);
export default router;
