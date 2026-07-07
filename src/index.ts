import fastify from "fastify";
import cors from "@fastify/cors";

import { mainRoute } from "./infra/routes/main-route.js";
import * as ErrorHandler from "./infra/middlewares/error-handler.js";
import "dotenv/config";

const app = fastify();

app.register(cors, { origin: "*" });

// app.use("/", mainRoute);

ErrorHandler.configure(app);

const PORT = Number(process.env.PORT) || 3333;

app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server running at ${address}`);
});

/* app.listen({ port: PORT, host: "0.0.0.0" }, () => {
  console.log(`Server running on port ${PORT}.`);
}); */
