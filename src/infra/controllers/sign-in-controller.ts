import type { Request, Response } from "express"
import { z } from "zod"
import { signInUseCase } from "../../app/use-cases/sign-in-usecases.js"
import { UnauthorizedError } from "../../app/errors/unauthorized-error.js"


const schemaSignInRequestBody = z.object({
    email: z.email("Email required."),
    password: z.string("Password required.").min(6, "Password must be at least 6 characters."),
})

export async function signInController(
    req: Request,
    res: Response
){
    try {
        const { email, password } = schemaSignInRequestBody.parse(req.body)

        const data = await signInUseCase({ email, password })

        return res.status(200).send(data)

    } catch (error) {

        if(error instanceof UnauthorizedError) {
            return res.status(401).send({ message: error.message })
        }


    }
}
