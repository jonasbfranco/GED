import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod"
import { profileUseCase } from "../../app/use-cases/profile-usecases.js"
import { UserAlreadyExistError } from "../../app/errors/user-already-exist-error.js"


const schemaProfileRequestBody = z.object({
    userid: z.string().nonempty(),
})

export async function profileController(
    req: FastifyRequest,
    reply: FastifyReply
){
    try {

         const userid = z.string().uuid().parse(req.userId);

        //const { userid } = schemaProfileRequestBody.parse(req.userId)

        const { user } = await profileUseCase({ userid })

        return reply.status(200).send(user)

    } catch (error) {

        if(error instanceof UserAlreadyExistError) {
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({
            message: "Internal Server Error"
        })


    }
}
