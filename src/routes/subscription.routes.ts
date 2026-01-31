import { Request, Response, Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req: Request, res: Response) => {
    res.send({ title: "GET all subscriptions" });
});

subscriptionRouter.get("/:id", (req: Request, res: Response) => {
    res.send({ title: "Get subscription by id" });
});

subscriptionRouter.post("/", (req: Request, res: Response) => {
    res.send({ title: "Create subscription" });
});

subscriptionRouter.put("/:id", (req: Request, res: Response) => {
    res.send({ title: "Update subscription by id" });
});

subscriptionRouter.delete("/:id", (req: Request, res: Response) => {
    res.send({ title: "Delete subscription by id" });
});

subscriptionRouter.get("/user/:id", (req: Request, res: Response) => {
    res.send({ title: "Get all users subscriptions" });
});

subscriptionRouter.put("/:id/cancel", (req: Request, res: Response) => {
    res.send({ title: "Cancel subscription" });
});

subscriptionRouter.get("/upcoming-renewals", (req: Request, res: Response) => {
    res.send({ title: "Get upcoming renewals" });
});


export default subscriptionRouter;
