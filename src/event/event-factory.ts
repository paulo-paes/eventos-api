import { PrismaClient } from "@prisma/client";
import { EventRepositoryImpl } from "./event-repository-impl";

const prismaClient = new PrismaClient()
export const eventRepository = new EventRepositoryImpl(prismaClient)
