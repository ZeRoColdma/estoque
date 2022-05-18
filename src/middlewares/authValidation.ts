import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UserController } from "../controllers/Users/UserController";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id } = verify(
      token,
      "8e9bb2bac5f18fa0b17716f4b9c10dab",
    ) as IPayload;

    const userRepository = new UserController();

    const user = await userRepository.findById(id);

    next();
  } catch (error) {
    return response.status(401).json({ message: "Token invalid" });
  }
}
