import type { Types } from "mongoose";
import type { PublicUser } from "../modules/auth/auth.types.js";

type AnyUserLike = {
    _id: Types.ObjectId | string;
    name: string;
    email: string;
    createdAt?: Date;
    password?: string;
};

export const toPublicUser = (user: AnyUserLike): PublicUser => {
    return {
        _id: typeof user._id === "string" ? user._id : user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt ? user.createdAt.toISOString() : undefined,
    };
};
