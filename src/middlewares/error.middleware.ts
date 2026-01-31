import type { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
    statusCode?: number;
    code?: number;
    keyValue?: Record<string, string>;
    errors?: Record<string, { message: string }>;
}

const errorMiddleware = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let error: ApiError = { ...err };
        error.message = err.message;
        console.error(err);

        // Mongoose bad ObjectId
        if (err.name === "CastError") {
            const message = "Resource not found.";
            error = new Error(message) as ApiError;
            error.statusCode = 404;
        }

        // Mongoose duplicate key
        if (err.code === 11000) {
            const message = "Duplicate field value entered";
            error = new Error(message) as ApiError;
            error.statusCode = 400;
        }

        // Mongoose validation error
        if (err.name === "ValidationError" && err.errors) {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(", ")) as ApiError;
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Server Error"
        });

    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
