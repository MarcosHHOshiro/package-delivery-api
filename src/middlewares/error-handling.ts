import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

export function errorHandling(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation error",
            issues: z.treeifyError(err)
        });
    }

    return res.status(500).json({ message: err.message });
};
