import { PrismaClient } from "@prisma/client"
import { UserRepositoryImpl } from "./user-repository-impl"
import { UserService } from "./user-service"
import { UserController } from "./user-controller"

export const prisma = new PrismaClient()
export const repository = new UserRepositoryImpl(prisma)
export const service = new UserService(repository)
export const controller = new UserController(service)