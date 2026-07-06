import { prisma } from "../../lib/prisma/prisma.js"
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UnauthorizedError } from "../errors/unauthorized-error.js";
import { InvalidCredentialsError } from "../errors/invalid-cedentials-error.js";

interface ISignInUseCaseRequest {
  email: string;
  password: string;
}

interface ISignInUseCaseResponse {
  user: {
    email: string;
  },
  token: string;
}

export async function signInUseCase({
  email,
  password,
}: ISignInUseCaseRequest): Promise<ISignInUseCaseResponse> {
  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // console.log(`Passou aqui: ${JSON.stringify(userExist)}`);

  if (!userExist) {
    throw new InvalidCredentialsError();
  }

  const matchPassword = await compare(password, userExist.password);

  if (!matchPassword) {
    throw new InvalidCredentialsError();
  }


  const JWT_SECRET = String(process.env.JWT_SECRET);
  const token = jwt.sign(
    {
      sub: userExist.id,
    },
    JWT_SECRET,
    {
      expiresIn: "1d"
    }
  )

  return {
    user: {
      email: userExist.email,
    },
    token,
  };
}
