import { Context } from "koa";
import { OrderRequest } from "./dto/order-request";

export class OrderController {
  constructor (private orderService: OrderService) {}


  async registerOrder(ctx: Context): Promise<void> {
    const orderRequest = ctx.request.body as OrderRequest;

    if (!orderRequest?.idEvento && !orderRequest?.quantidade) {
      ctx.body = {
        message: "invalid input, inform event id and quantity"
      }
      ctx.status = 400
      return
    }

    ctx.status = 201
    await this.orderService.register(orderRequest)
  }
}