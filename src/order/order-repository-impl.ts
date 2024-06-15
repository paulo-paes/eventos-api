import { PrismaClient } from "@prisma/client";
import { Order } from "./model/order";
import { OrderRepository } from "./order-repository";

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private prismaClient: PrismaClient) {}
  insert(object: Order): Promise<Order> {
    return this.prismaClient.pedidos.create({
      data: {
        quantidade_pedido: object.quantidade,
        valor_total: object.valorTotal,
        id_usuario: object.idUsuario,
        id_evento: object.idEvento
      }
    });
  }
}