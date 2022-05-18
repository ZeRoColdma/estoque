import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "../../database/entity/Users";
import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express";

class AuthUser {
  async signIn(request: Request, response: Response) {
    const { email, password } = request.body;
    const usersRepository: Repository<User> = getRepository(User);
    const user = await await usersRepository.findOne({ where: { email } });
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
