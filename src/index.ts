import express from "express"
import { mainRoute } from "./routes/main-route.js"
import { errorHandler } from "./middlewares/error-handler.js"

const app = express()

app.use(express.json())

app.use("/", mainRoute)

app.use(errorHandler)

app.listen(3333, () => console.log("server running."))
