process.on("uncaughtException", (err) => {
    console.error("uncaughtException:", err);
});
process.on("unhandledRejection", (reason) => {
    console.error("unhandledRejection:", reason);
});
import express from "express";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/user/user.routes.js";
import subscriptionRouter from "./modules/subscriptions/subscription.routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use(errorMiddleware);
app.get("/", (_req, res) => {
    res.send("Welcome");
});
app.listen(env.PORT, async () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
    await connectToDatabase();
});
export default app;
