import { Router, type Request, type Response } from "express"

interface ISignUpRequest{
    email: string,
    password: string
}

const users: ISignUpRequest[] = []

export const mainRoute = Router()


mainRoute.get("/", (req: Request, res: Response) => {
    return res.status(200).send({ message: "Bem vindo!" })
})

mainRoute.get("/ping", (req: Request, res: Response) => {
    return res.status(200).send({ message: "pong" })
})

mainRoute.post("/sign-up", (req: Request, res: Response) => {
    const { email, password } = req.body
    const cleanPassword = password?.trim()


    if (!email){ //fazer condição de estar com espaço em branco
        //throw new Error()
        return res.status(400).send({ message: "Email required."})
    }

    if (!cleanPassword) {
        return res.status(400).send({ message: "Password required." });
    }

    if (cleanPassword.length < 8) {
        return res.status(400).send({
            message: "Password must be at least 8 characters."
        });
    }

    const userExist = users.find(item => item.email == email)
    if (userExist){
        //throw new Error()
        return res.status(409).send({ message: "User already exist."})
    }

    users.push({email, password})
    //console.log(users)

    return res.status(201).send({ users })
})