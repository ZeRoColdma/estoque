import { User } from "../../database/entity/Users";
import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { hash } from "bcrypt";

class UserController {
  async index(request: Request, response: Response) {
    const usersRepository: Repository<User> = getRepository(User);
    const users = await usersRepository.find();
    return response.json(users);
  }

  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const usersRepository: Repository<User> = getRepository(User);

    const userExists = await usersRepository.findOne({
      where: { email },
    });

    if (userExists) {
      return response.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await usersRepository.save(user);
    return response.json(user);
  }

  async findById(id: string): Promise<User> {
    const usersRepository: Repository<User> = getRepository(User);
    const user = await usersRepository.findOne(id);
    return user;
  }
}

export { UserController };
