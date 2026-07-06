import { Router, type Request, type Response } from "express";

import { signUpController } from "../controllers/sign-up-controller.js";
import { signInController } from "../controllers/sign-in-controller.js";
import { isAuth } from '../middlewares/isAuth.js';
import { profileController } from "../controllers/profile-controller.js";

export const mainRoute = Router();

mainRoute.get("/", (req: Request, res: Response) => {
  return res.status(200).send({ message: "Bem vindo!" });
});

mainRoute.get("/ping", (req: Request, res: Response) => {
  return res.status(200).send({ message: "pong" });
});

mainRoute.post("/sign-up", signUpController);
mainRoute.post("/sign-in", signInController);
mainRoute.get("/profile", isAuth, profileController);
