import { Next } from "koa";
import { verifyToken } from "../core/util/jwt";
import { UserRepository } from "../user/user-repository";
import { Context } from "../app";

export class AuthMiddleware {
  constructor(private userRepository: UserRepository) {}
  async validate(ctx: Context, next: Next): Promise<any> {
    // TODO: find a better way to skip login or other public routes
    if (ctx.request.path === '/login' || ctx.request.path === '/register') {
      return next()
    }

    let token = ctx.request.headers["authorization"] as string;
    if (!token) {
      ctx.status = 401
      ctx.body = {
        message: "unauthorized"
      }
      return
    }

    const payload = verifyToken(token.replace("Bearer ", ""))
    if (!payload) {
      ctx.status = 401
      ctx.body = {
        message: "unauthorized"
      }
      return
    }

    ctx.user = await this.userRepository.findById(payload.userId)

    return next()
  }
}