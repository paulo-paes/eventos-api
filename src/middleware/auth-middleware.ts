import { Context, Next } from "koa";
import { verifyToken } from "../core/util/jwt";

export class AuthMiddleware {
  async validate(ctx: Context, next: Next): Promise<any> {
    // TODO: find a better way to skip login or other public routes
    if (ctx.request.path === '/login') {
      return next()
    }
    const token = ctx.request.headers["authorization"]

    const payload = verifyToken(token)

    if (!payload) {
      ctx.status = 401
      ctx.body = {
        message: "unauthorized"
      }
      return
    }

    ctx.userId = payload.userId

    return next()
  }
}