import { PrismaClient } from "@prisma/client";
import { Order } from "./model/order";
import { OrderRepository } from "./order-repository";
import { randomUUID } from "node:crypto";
import { User } from "../user/model/user";

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private prismaClient: PrismaClient) {}
  async insert(object: Order): Promise<Order> {
    const prismaOrder = await this.prismaClient.pedidos.create({
      data: {
        quantidade_pedido: object.quantidade,
        valor_total: object.valorTotal,
        id_usuario: object.idUsuario,
        id_evento: object.idEvento,
        id: randomUUID(),
      },
    });

    return new Order(
      prismaOrder.id_usuario,
      prismaOrder.id_evento,
      prismaOrder.quantidade_pedido,
      prismaOrder.valor_total.toString(),
      prismaOrder.data_pedido,
      prismaOrder.status_pedido
    );
  }

  async findByUser(user: User): Promise<Order[]> {
    const prismaOrders = await this.prismaClient.pedidos.findMany({
      where: {
        id_usuario: user.id,
      },
    });

    const orders: Order[] = [];

    for (const order of prismaOrders) {
      orders.push(
        new Order(
          order.id_usuario,
          order.id_evento,
          order.quantidade_pedido,
          order.valor_total.toString(),
          order.data_pedido,
          order.status_pedido
        )
      );
    }

    return orders;
  }
}
