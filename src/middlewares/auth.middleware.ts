import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import { User } from "../modules/user/user.model.js";

interface AuthPayload extends JwtPayload {
    userId: string;
}

const authorize = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let token: string | undefined;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        req.user = user;

        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};

export default authorize;
