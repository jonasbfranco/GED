import express from "express"

const app = express()

app.use(express.json())

app.get("/ping", (req, res) => {
    return res.status(200).send({ message: "pong" })
})

app.listen(3333, () => console.log("server running."))