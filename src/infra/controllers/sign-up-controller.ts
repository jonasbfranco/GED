import type { Request, Response } from "express"
import { z, ZodError } from "zod"
import { signUpUseCase } from "../../app/use-cases/sign-up-usecases.js"
import { UserAlreadyExistError } from "../../app/errors/user-already-exist-error.js"

// import { prisma } from "../lib/prisma/prisma.js"

interface ISignUpRequest{
    email: string,
    password: string
}

//const users: ISignUpRequest[] = []
const schemaSignUpRequestBody = z.object({
    email: z.email("Email required."),
    password: z.string("Password required.").min(6, "Password must be at least 6 characters."),
})

export async function signUpController(
    req: Request,
    res: Response
){
    try {
        const { email, password } = schemaSignUpRequestBody.parse(req.body)

        // if (!email){ //fazer condição de estar com espaço em branco
        //     //throw new Error()
        //     return res.status(400).send({ message: "Email required."})
        // }

        // const userExist = await prisma.user.findUnique({
        //     where: {
        //         email,
        //     }
        // })

        // const userExist = users.find(item => item.email == email)
        // if (userExist){
        //     //throw new Error()
        //     return res.status(409).send({ message: "User already exist."})
        // }

        //users.push({email, password})
        //console.log(users)
        // const users = await prisma.user.create({
        //     data: {
        //         email,
        //         password,
        //     }
        // })

        const { user } = await signUpUseCase({ email, password })

        // return res.status(201).send({ user })
        return res.status(201).send()

    } catch (error) {

        if(error instanceof UserAlreadyExistError) {
            return res.status(409).send({ message: error.message })
        }


    }
}
