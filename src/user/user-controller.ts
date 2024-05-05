import { Context } from "koa";
import { UserService } from "./user-service";
import { UserRequest } from "./dto/user-request";
import { UserResponse } from "./dto/user-response";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(ctx: Context): Promise<void> {
    const users = await this.userService.getAllUsers();

    const response: UserResponse[] = []
    for (const user of users) {
      response.push({
        id: user.id,
        cpf: user.cpf,
        nome: user.nome,
        email: user.email,
        dataCriacao: user.dataCriacao,
        dataAtualizacao: user.dataAtualizacao
      })
    }

    ctx.body = response
  }

  async registerUser(ctx: Context): Promise<void> {
    const userRequest = ctx.request.body as UserRequest;

    if (
      !userRequest ||
      !userRequest.nome ||
      !userRequest.cpf ||
      !userRequest.email ||
      !userRequest.senha
    ) {
      ctx.status = 400
      ctx.body = {
        "message": "invalid input. Inform all values as nome, cpf, email and senha"
      }
      return
    }

    ctx.status = 201
    ctx.body = await this.userService.createUser(userRequest)
  }

  async login(ctx: Context): Promise<void> {
    const userRequest = ctx.request.body as { email: string, senha: string}
    if (!userRequest?.email?.length || !userRequest?.senha?.length) {
      ctx.status = 400
      ctx.body = {
        "message": "Missing required inputs!"
      }
      return
    }
    ctx.body = await this.userService.login(userRequest)
  }
}
