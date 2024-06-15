import { User } from "../user/model/user";
import { Order } from "./model/order";

export interface OrderRepository {
  insert(object: Order): Promise<Order>;
  findByUser(user: User): Promise<Order[]>
}