import { User } from "./model/user";

export interface UserRepository {
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  insert(object: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
