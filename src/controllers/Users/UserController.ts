import { Request, Response } from "express";
import { hash } from "bcrypt";
import { prismaClient } from "../../database/prismaClient";

class UserController {
  async index(request: Request, response: Response) {
    const users = await prismaClient.user.findMany();
    return response.json(users);
  }

  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userExists) {
      return response.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return response.json(user);
  }

  async findById(id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });
    return user;
  }
}

export { UserController };
