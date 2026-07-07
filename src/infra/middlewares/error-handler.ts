import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { ZodError } from "zod";

export const configure = (app: FastifyInstance) => {
  app.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {

    if (error instanceof ZodError){
      return reply.status(400).send({
          message: "Validation error",
          issues: error.format()
      });
    }

      return reply.status(500).send({ message: "Internal server error" })
  })
}
