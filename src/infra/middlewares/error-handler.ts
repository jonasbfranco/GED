import type { Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response
){

  if(error instanceof ZodError) {
      return res.status(400).send({
          message: "Validation error",
          issues: error.format()
      })
  }

  return res.status(500).send({ message: "Internal server error" })

}
