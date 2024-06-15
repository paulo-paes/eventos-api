import { User } from "../user/model/user";
import { Event } from "./model/event";

export interface EventRepository {
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event>;
  update(event: Event): Promise<Event>;
  insert(event: Event): Promise<Event>;
}
