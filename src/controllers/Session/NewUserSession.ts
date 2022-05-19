import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

class AuthUser {
  async signIn(request: Request, response: Response) {
    const { email, password } = request.body;
    const user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }
    if (!(await compare(password, user.password))) {
      return response.status(400).json({ error: "Invalid password" });
    }
    const { id, name } = user;
    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: sign({ id }, "8e9bb2bac5f18fa0b17716f4b9c10dab", {
        subject: id,
        expiresIn: "1d",
      }),
    });
  }
}

export { AuthUser };
