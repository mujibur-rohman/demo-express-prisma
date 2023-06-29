import express from "express";
import { publicRouter } from "../router/public-api";

export const app = express();
app.use(express.json());
app.use(publicRouter);
