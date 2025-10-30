import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import z from "zod"
import { AppError } from "@/utils/AppError"
import { compare } from "bcrypt"
import { authConfig } from "@/configs/auth"

class SessionsController {
    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            email: z.email(),
            password: z.string().min(6)
        })

        const { email, password } = bodySchema.parse(req.body)

        const user = await prisma.user.findFirst({
            where: { email }
        })

        if (!user) {
            throw new AppError("Invalid email or password!", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError("Invalide email or password", 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        var jwt = require('jsonwebtoken');
        const token = jwt.sign({ role: user.role ?? "customer" },
            secret, {
            subject: user.id,
            expiresIn
        })

        const { password: _password, ...userWithoutPassword } = user

        return res.json({ token, user: userWithoutPassword })
    }
}

export { SessionsController }