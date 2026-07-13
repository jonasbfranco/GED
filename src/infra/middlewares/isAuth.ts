import type { FastifyRequest, FastifyReply } from "fastify";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";

//import { UnauthorizedError } from "../../app/errors/unauthorized-error.js";
interface TokenPayLoad extends JwtPayload {
  sub: string
}

export async function isAuth(req: FastifyRequest, reply: FastifyReply){
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return reply.status(401).send({
            message: "Unauthorized."
        });
    }


    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        return reply.status(401).send({
            message: "Formato do token inválido."
        });
    }


    const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as TokenPayLoad;


    req.userId = decoded.sub;




  } catch (error) {
    // console.error(error);
    return reply.status(401).send({ message: "Unauthorized." })
  }

}
