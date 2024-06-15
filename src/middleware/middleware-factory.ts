import { userRepository } from "../user/user-factory";
import { AuthMiddleware } from "./auth-middleware";

export const authMiddleware = new AuthMiddleware(userRepository)