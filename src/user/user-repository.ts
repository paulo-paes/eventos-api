import { Repository } from "../core/repository";
import { User } from "./domain/user";

export interface UserRepository extends Repository<User, string> {
  findByEmail(email: string): Promise<User>;
}
