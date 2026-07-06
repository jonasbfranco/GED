import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";

interface TokenPayLoad extends JwtPayload {
  sub: string
}

export function isAuth(
  req: Request,
  res: Response,
  next: NextFunction,
){

  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).send({ message: "Unauthorized..." })
    }

    console.log(authHeader)

    const [_, token] = authHeader.split(" ")
    const JWT_SECRET = String(process.env.JWT_SECRET)
    console.log(JWT_SECRET)
    const { sub } = jwt.verify(String(token), JWT_SECRET) as TokenPayLoad
    console.log("ola sub")

    req.userId = sub
    console.log(req.userId)
    return next()

  } catch (error) {
    console.error(error);
    return res.status(401).send({ message: "Unauthorized...." })
  }

}
