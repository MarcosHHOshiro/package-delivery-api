import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

function verifyUserAuthorization(role: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new AppError("Unauthorized", 401)
        }
console.log(req.user.role)
        if (!role.includes(req.user.role)) {
            throw new AppError("Unauthorized", 401)
        }

        return next()
    }
}

export { verifyUserAuthorization }