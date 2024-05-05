import { Repository } from "../core/repository";
import { User } from "./domain/user";
import { UserRequest } from "./dto/user-request";
import { UserResponse } from './dto/user-response';

export class UserService {
  constructor (
    private userRepository: Repository<User, string>
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
        senha: userRequest.senha,
        login: userRequest.email
      }
    })
  }
}