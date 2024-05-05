import { PrismaClient } from "@prisma/client"
import { UserRepositoryImpl } from "./user-repository-impl"
import { UserService } from "./user-service"
import { UserController } from "./user-controller"

const prisma = new PrismaClient()
export const userRepository = new UserRepositoryImpl(prisma)
export const userService = new UserService(userRepository)
export const controller = new UserController(userService)