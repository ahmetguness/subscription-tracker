import type { RequestHandler } from "express";
import type {
    CreateSubscriptionBody,
    CreateSubscriptionResponse,
    GetUserSubscriptionsParams,
    GetUserSubscriptionsResponse
} from "./subscription.types.js";
import { Subscription } from "./subscription.model.js";

export const createSubscription: RequestHandler<
    {},
    CreateSubscriptionResponse,
    CreateSubscriptionBody
> = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: {
                _id: subscription._id.toString(),
                name: subscription.name,
                price: subscription.price,
                currency: subscription.currency,
                frequency: subscription.frequency,
                category: subscription.category,
                user: subscription.user.toString(),
                createdAt: subscription.createdAt.toISOString(),
                updatedAt: subscription.updatedAt.toISOString(),
            },
        });
    } catch (err) {
        next(err);
    }
};

export const getUserSubscriptions: RequestHandler<
    GetUserSubscriptionsParams,
    GetUserSubscriptionsResponse
> = async (req, res, next) => {
    try {
        if (req.user._id.toString() !== req.params.id) {
            const err = new Error("Unauthorized access to user subscriptions");
            (err as any).status = 401;
            throw err;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({
            success: true,
            message: "User subscriptions retrieved successfully",
            data: subscriptions.map((sub) => ({
                _id: sub._id.toString(),
                name: sub.name,
                price: sub.price,
                currency: sub.currency,
                frequency: sub.frequency,
                category: sub.category,
                paymentMethod: sub.paymentMethod,
                status: sub.status,
                startDate: sub.startDate.toISOString(),
                renewalDate: sub.renewalDate ? sub.renewalDate.toISOString() : undefined,
                user: sub.user.toString(),
                createdAt: sub.createdAt.toISOString(),
                updatedAt: sub.updatedAt.toISOString(),
            })),
        });
    } catch (err) {
        next(err);
    }
};


