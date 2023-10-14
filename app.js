import express from "express";
import dotenv from "dotenv";
const app = express();
import courseRouter from "./routes/CourseRoutes.js"
import userRouter from "./routes/userRoutes.js";
import {errorMiddleware} from "./middlewares/error.js"

dotenv.config({
    path: "./config/config.env"
})

app.use("/api/v1", courseRouter);
app.use("/api/v1", userRouter);
app.use(errorMiddleware);
export default app;