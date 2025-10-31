import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma"
import { string } from "zod";

describe("SessionsController", () => {
    let user_id: string

    //deleta o usuario criado para o teste
    afterAll(async () => {
        await prisma.user.delete({
            where: { id: user_id }
        })
    })


    it("should authenticate and get acess token", async () => {
        const userResponse = await request(app).post("/users").send({
            name: "Auth Test User",
            email: "authtestuser@example.com",
            password: "password123",
        })

        user_id = userResponse.body.id

        const sessionResponse = await request(app).post("/sessions").send({
            email: "authtestuser@example.com",
            password: "password123",
        })

        expect(sessionResponse.status).toBe(200)
        expect(sessionResponse.body.token).toEqual(expect.any(String))
    })
})