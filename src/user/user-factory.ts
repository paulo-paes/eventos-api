import { PrismaClient } from "@prisma/client"
import { UserRepository } from "./user-repository"
import { UserService } from "./user-service"
import { UserController } from "./user-controller"

export const prisma = new PrismaClient()
export const repository = new UserRepository(prisma)
export const service = new UserService(repository)
export const controller = new UserController(service)