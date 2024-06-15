import { PrismaClient } from "@prisma/client";
import { EventRepositoryImpl } from "./event-repository-impl";
import { EventService } from "./event-service";
import { EventController } from "./event-controller";

const prismaClient = new PrismaClient();
export const eventRepository = new EventRepositoryImpl(prismaClient);
export const eventService = new EventService(eventRepository);
export const controller = new EventController(eventService);
