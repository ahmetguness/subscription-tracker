import { User } from "./user.model.js";
import { toPublicUser } from "../../utils/toPublicUser.js";
export const getUsers = async (_req, res, next) => {
    try {
        const users = await User.find();
        const safeUsers = users.map((u) => toPublicUser(u.toObject()));
        res.status(200).json({
            success: true,
            data: {
                users: safeUsers,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        const safeUser = toPublicUser(user.toObject());
        res.status(200).json({
            success: true,
            data: { user: safeUser },
        });
    }
    catch (err) {
        next(err);
    }
};
