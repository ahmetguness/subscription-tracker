import express from "express";
import { env } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
const app = express();
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.get("/", (_req, res) => {
    res.send("Welcome");
});
app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
});
export default app;
