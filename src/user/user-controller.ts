import { Context } from "koa";
import { UserService } from "./user-service";
import { UserRequest } from "./dto/user-request";
import { UserResponse } from "./dto/user-response";

export class UserController {
  constructor(private userService: UserService) {}

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
    try {
      ctx.body = await this.userService.login(userRequest)
    } catch (e) {
      ctx.status = 401
      ctx.body = {
        message: "email ou senha inválidos!"
      }
    }
  }
}
