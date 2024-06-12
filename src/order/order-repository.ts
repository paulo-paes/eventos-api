import { Order } from "./model/order";

export interface OrderRepository {
  insert(object: Order): Promise<Order>;
}