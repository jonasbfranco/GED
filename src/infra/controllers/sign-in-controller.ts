import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod"
import { signInUseCase } from "../../app/use-cases/sign-in-usecases.js"
import { UnauthorizedError } from "../../app/errors/unauthorized-error.js"
import { InvalidCredentialsError } from "../../app/errors/invalid-cedentials-error.js"


const schemaSignInRequestBody = z.object({
    email: z.email("Email required."),
    password: z.string("Password required.").min(6, "Password must be at least 6 characters."),
})

export async function signInController(
    req: FastifyRequest,
    reply: FastifyReply
){
    try {
        const { email, password } = schemaSignInRequestBody.parse(req.body)

        const data = await signInUseCase({ email, password })

        return reply.status(200).send(data)

    } catch (error) {

        if(error instanceof InvalidCredentialsError) {
            return reply.status(401).send({ message: error.message })
        }

        if(error instanceof UnauthorizedError) {
            return reply.status(401).send({ message: error.message })
        }

        return reply.status(500).send({
            message: "Internal Server Error"
        });

    }
}
