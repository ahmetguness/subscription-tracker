import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import { User } from "../modules/user/user.model.js";
const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
export default authorize;
