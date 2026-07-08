// import { Router, type Request, type Response } from "express";
import type { FastifyInstance } from "fastify";

//import { signUpController } from "../controllers/sign-up-controller.js";
// import { signInController } from "../controllers/sign-in-controller.js";
import { profileController } from "../controllers/profile-controller.js";
import { isAuth } from '../middlewares/isAuth.js';

// export const mainRoute = Router();

/* mainRoute.get("/ping", (req: Request, res: Response) => {
  return res.status(200).send({ message: "pong" });
}); */
export async function homeRoute(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    return reply.status(200).send({ message: "Bem-vindo!" });
  });
}

export async function pingRoute(app: FastifyInstance) {
  app.get("/ping", async (request, reply) => {
    return reply.status(200).send({ message: "pong" });
  })
};
/* mainRoute.get("/ping", (req: Request, res: Response) => {
  return res.status(200).send({ message: "pong" });
}); */

//mainRoute.post("/sign-up", signUpController);
// mainRoute.post("/sign-in", signInController);
// mainRoute.get("/profile", isAuth, profileController);
