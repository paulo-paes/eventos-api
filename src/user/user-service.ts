import { comparePassword, hashPassword } from "../core/util/hasher";
import { createToken, verifyToken } from "../core/util/jwt";
import { User } from "./domain/user";
import { LoginRequest } from "./dto/login-request";
import { UserRequest } from "./dto/user-request";
import { UserRepository } from "./user-repository";

export class UserService {
  constructor (
    private userRepository: UserRepository
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  async createUser(userRequest: UserRequest): Promise<User> {
    return this.userRepository.insert({
      nome: userRequest.nome,
      email: userRequest.email,
      cpf: userRequest.cpf,
      loginInfo: {
        senha: await hashPassword(userRequest.senha),
        login: userRequest.email
      }
    })
  }

  async login(userRequest: LoginRequest): Promise<any> {
    const user = await this.userRepository.findByEmail(userRequest.email)
    if (!user) return String(false)
    const isPasswordValid = comparePassword(user.loginInfo.senha, userRequest.senha)

    if (!isPasswordValid) return String(false)

    const token = createToken({
      userId: user.id
    })

    return {
      token
    }
  }
}