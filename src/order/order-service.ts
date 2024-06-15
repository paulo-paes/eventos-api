import bigDecimal from "js-big-decimal";
import { User } from "../user/model/user";
import { OrderRequest } from "./dto/order-request";
import { Order } from "./model/order";
import { OrderRepository } from "./order-repository";
import { EventRepository } from "../event/event-repository";

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private eventoRepository: EventRepository
  ) {}

  async register(orderRequest: OrderRequest, user: User) {
    const evento = await this.eventoRepository.findById(orderRequest.idEvento);

    if (!evento) {
      throw new Error("evento não encontrado");
    }

    const valorTotal = bigDecimal.multiply(
      orderRequest.quantidade,
      evento.preco
    );
    const order = new Order(
      user.id,
      orderRequest.idEvento,
      orderRequest.quantidade,
      bigDecimal.round(valorTotal, 2)
    );
    evento.totalIngressos -= orderRequest.quantidade;

    await this.orderRepository.insert(order);
    await this.eventoRepository.update(evento);
  }

  async listOrders(user: User) {
    return this.orderRepository.findByUser(user)
  }
}
