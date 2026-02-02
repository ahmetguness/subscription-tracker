import type { RequestHandler } from "express";
import type { StringValue } from "ms";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../user/user.model.js";
import { env } from "../../config/env.js";
import type { SignInBody, SignInResponse, SignUpBody, SignUpResponse } from "./auth.types.js";
import { toPublicUser } from "../../utils/toPublicUser.js";

type JwtPayload = { userId: string };

export const signUp: RequestHandler<{}, SignUpResponse, SignUpBody> = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail }).session(session);
        if (existingUser) {
            const error = new Error("User already exists") as Error & { statusCode: number };
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const created = await User.create(
            [{ name, email: normalizedEmail, password: hashedPassword }],
            { session }
        );
        const userDoc = created[0];

        const token = jwt.sign(
            { userId: userDoc._id.toString() } satisfies JwtPayload,
            env.JWT_SECRET,
            { expiresIn: env.JWT_EXPIRES_IN as StringValue }
        );

        await session.commitTransaction();

        const safeUser = toPublicUser(userDoc.toObject());

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: { token, user: safeUser },
        });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
};




export const signIn: RequestHandler<{}, SignInResponse, SignInBody> = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            const error = new Error("User doesnt exist") as Error & { statusCode: number };
            error.statusCode = 401;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid password") as Error & { statusCode: number };
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            { userId: user._id.toString() } satisfies JwtPayload,
            env.JWT_SECRET,
            { expiresIn: env.JWT_EXPIRES_IN as StringValue }
        );

        const safeUser = toPublicUser(user.toObject());

        res.status(200).json({
            success: true,
            message: "Sign-in successful",
            data: { token, user: safeUser },
        });
    } catch (err) {
        next(err);
    }
};



export const signOut: RequestHandler = async (req, res, next) => {
    try {
        return res.json({ ok: true });
    } catch (err) {
        next(err);
    }
};
