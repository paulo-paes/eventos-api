import { Context } from "../app";
import { OrderRequest } from "./dto/order-request";
import { OrderService } from "./order-service";

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

    await this.orderService.register(orderRequest, ctx.user)
    ctx.status = 200
  }

  async getOrders(ctx: Context) {
    ctx.body = await this.orderService.listOrders(ctx.user)
  }
}