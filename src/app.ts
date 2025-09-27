import express from "express";
import cors from "cors";
import { json } from "body-parser";
import routes from "./routes";
import { errorHandler } from "./core/http";

const app = express();
app.use(cors());
app.use(json());

app.use(routes);
app.use(errorHandler);

export default app;
