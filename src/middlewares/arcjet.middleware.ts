import type { RequestHandler } from "express";
import aj from "../config/arcjet.js";

const arcjetMiddleware: RequestHandler = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    error: "Too Many Requests - Rate limit exceeded",
                });
            }

            if (decision.reason.isBot()) {
                return res.status(403).json({
                    error: "Forbidden - Bot access denied",
                });
            }

            return res.status(403).json({ error: "Forbidden - Access denied" });
        }

        next();
    } catch (err) {
        console.error("Arcjet Middleware Error:", err);
        next(err);
    }
};

export default arcjetMiddleware;
