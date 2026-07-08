import fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";

import { profileRoute } from "./infra/routes/profile-route.js";
import { signUpRoute } from "./infra/routes/sign-up-route.js";
import { signInRoute } from "./infra/routes/sign-in-route.js";

import { homeRoute, pingRoute } from "./infra/routes/main-route.js";
//import { mainRoute } from "./infra/routes/main-route.js";

import * as ErrorHandler from "./infra/middlewares/error-handler.js";


const app = fastify();

app.register(cors, { origin: "*" });

// app.use("/", mainRoute);
app.register(homeRoute);
app.register(pingRoute);

app.register(signUpRoute);
app.register(signInRoute);
app.register(profileRoute);


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
