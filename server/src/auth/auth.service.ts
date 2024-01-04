import type { SignInDto } from "./dto/sign-in.dto";
import { UnauthorizedError } from "routing-controllers";
import { UserRepository } from "../user/user.repository";

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  userRepository: UserRepository;

  async signIn({ email, password }: SignInDto) {
    const maybeUser = await this.userRepository.findByEmail(email);

    if (maybeUser === null) {
      throw new UnauthorizedError("Não existe um usuário com esse email");
    }

    if (password !== maybeUser.passwd) {
      throw new UnauthorizedError("Email ou senha inválidos");
    }

    return { user: maybeUser };
  }
}