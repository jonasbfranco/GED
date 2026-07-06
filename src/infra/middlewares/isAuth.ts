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
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized."
        });
    }

    // const [_, token] = authHeader.split(' ')
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Formato do token inválido."
        });
    }

    // const JWT_SECRET = String(process.env.JWT_SECRET)
    // const { sub } = jwt.verify(String(token), JWT_SECRET) as TokenPayLoad
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as TokenPayLoad;

    // req.userId = sub
    req.userId = decoded.sub;

    return next();


  } catch (error) {
    // console.error(error);
    return res.status(401).send({ message: "Unauthorized." })
  }

}
