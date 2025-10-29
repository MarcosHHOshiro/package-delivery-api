import { Request, Response } from 'express';
import { hash } from "bcrypt"
import z from 'zod';

class UsersController {
    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.email(),
            password: z.string().min(6)
        })

        const { name, email, password } = bodySchema.parse(req.body)

        const hashedPassword = await hash(password, 8)

        return res.status(201).json({ message: hashedPassword });
    }
}

export { UsersController };