import express from "express";
import { mainRoute } from "./infra/routes/main-route.js";
import { errorHandler } from "./infra/middlewares/error-handler.js";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use("/", mainRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
