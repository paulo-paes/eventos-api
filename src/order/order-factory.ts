import { PrismaClient } from "@prisma/client"
import { OrderController } from "./order-controller"
import { OrderService } from "./order-service"
import { OrderRepositoryImpl } from "./order-repository-impl";
import { eventRepository } from "../event/event-factory";

const prisma = new PrismaClient()
export const orderRepository = new OrderRepositoryImpl(prisma)
export const orderService = new OrderService(orderRepository, eventRepository)
export const controller = new OrderController(orderService)
