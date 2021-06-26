import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticationUserService {
  async execute({email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    //Verificar se email existente
    const user = await usersRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Password incorrect")
    }

    //verificar se a senha está correta
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect")
    }

    //Gerar TOKEN
    const token = sign({
      email: user.email,
    },"5363c36486d6d914127afd27d1f01dd7", {
      subject: user.id,
      expiresIn: "1d"
    }
    );

    return token;
  }
}

export { AuthenticationUserService }