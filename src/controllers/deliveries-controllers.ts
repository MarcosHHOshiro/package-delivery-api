import { Request, Response } from "express"

class DeliveriesController {
    create(req: Request, res: Response) {
        return res.json({ message: "ok" })
    }
}

export { DeliveriesController }