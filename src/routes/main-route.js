import { Router } from "express"

export const mainRoute = Router()


mainRoute.get("/", (req, res) => {
    return res.status(200).send({ message: "Bem vindo!" })
})

mainRoute.get("/ping", (req, res) => {
    return res.status(200).send({ message: "pong" })
})
