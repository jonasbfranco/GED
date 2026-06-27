import type { Request, Response } from "express"
import { z, ZodError } from "zod"

interface ISignUpRequest{
    email: string,
    password: string
}

const users: ISignUpRequest[] = []
const schemaSignUpRequestBody = z.object({
    email: z.email("Email required."),
    password: z.string("Password required.").min(6, "Password must be at least 6 characters."),
})

export function signUpController(
    req: Request,
    res: Response
){
    try {
        const { email, password } = schemaSignUpRequestBody.parse(req.body)
    
        if (!email){ //fazer condição de estar com espaço em branco
            //throw new Error()
            return res.status(400).send({ message: "Email required."})
        }
    
        const userExist = users.find(item => item.email == email)
        if (userExist){
            //throw new Error()
            return res.status(409).send({ message: "User already exist."})
        }
    
        users.push({email, password})
        //console.log(users)
    
        return res.status(201).send({ users })
        
    } catch (error) {
        if(error instanceof ZodError) {
            return res.status(400).send({ 
                message: "Validation error", 
                issues: error.format()
            })
        }

        return res.status(500).send({ message: "Internal server error" })
    }
}