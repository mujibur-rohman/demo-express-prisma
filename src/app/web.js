import express from "express";
import { publicRouter } from "../router/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../router/api.js";

export const app = express();
app.use(express.json());

app.use(publicRouter);
app.use(userRouter);

app.use(errorMiddleware);
