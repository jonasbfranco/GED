import type { Request, Response } from "express"
import { z } from "zod"
import { profileUseCase } from "../../app/use-cases/profile-usecases.js"
import { UserAlreadyExistError } from "../../app/errors/user-already-exist-error.js"


const schemaProfileRequestBody = z.object({
    userid: z.string().nonempty(),
})

export async function profileController(
    req: Request,
    res: Response
){
    try {

         const userid = z.string().uuid().parse(req.userId);

        //const { userid } = schemaProfileRequestBody.parse(req.userId)

        const { user } = await profileUseCase({ userid })

        return res.status(200).send(user)

    } catch (error) {

        if(error instanceof UserAlreadyExistError) {
            return res.status(404).send({ message: error.message })
        }

        return res.status(500).json({
            message: "Internal Server Error"
        })


    }
}
