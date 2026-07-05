import { prisma } from "../../lib/prisma/prisma.js"
import "dotenv/config";
import { UserAlreadyExistError } from "../errors/user-already-exist-error.js";

interface IProfileUseCaseRequest {
  userid: string;
}

interface IProfileUseCaseResponse {
  user: {
    id: string;
    email: string;
    createdAt: Date;
  }
}

export async function profileUseCase({
  userid,
}: IProfileUseCaseRequest): Promise<IProfileUseCaseResponse> {
  const userExist = await prisma.user.findUnique({
    where: {
      id: userid,
    },
  });

  if (!userExist) {
    throw new UserAlreadyExistError();
  }

  return {
    user: {
      id: userExist.id,
      email: userExist.email,
      createdAt: userExist.createdAt
    },
  };
}
