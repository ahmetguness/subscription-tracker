import { Request, Response, Router } from "express";
import authorize from "../../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "./subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req: Request, res: Response) => {
    res.send({ title: "GET all subscriptions" });
});

subscriptionRouter.get("/:id", (req: Request, res: Response) => {
    res.send({ title: "Get subscription by id" });
});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req: Request, res: Response) => {
    res.send({ title: "Update subscription by id" });
});

subscriptionRouter.delete("/:id", (req: Request, res: Response) => {
    res.send({ title: "Delete subscription by id" });
});

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req: Request, res: Response) => {
    res.send({ title: "Cancel subscription" });
});

subscriptionRouter.get("/upcoming-renewals", (req: Request, res: Response) => {
    res.send({ title: "Get upcoming renewals" });
});


export default subscriptionRouter;
