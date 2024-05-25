import { PrismaClient } from '@prisma/client';
import { Event } from './domain/event';
import { EventRepository } from './event-repository';

export class EventRepositoryImpl implements EventRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async findAll(): Promise<Event[]> {
    const prismaEvents = await this.prismaClient.eventos.findMany()
    const result: Event[] = []

    for (const prismaEvent of prismaEvents) {
      const event = new Event(
        prismaEvent.titulo,
        prismaEvent.descricao,
        prismaEvent.data_criacao,
        prismaEvent.data_atualizacao,
        prismaEvent.data_inicio_evento,
        prismaEvent.data_fim_evento,
        null,
        null,
        prismaEvent.id
      )

      result.push(event)
    }

    return result
  }

  async findById(id: string): Promise<Event> {
    const prismaEvent = await this.prismaClient.eventos.findFirst({
      where: {
        id
      }
    })

    const event = new Event(
      prismaEvent.titulo,
      prismaEvent.descricao,
      prismaEvent.data_criacao,
      prismaEvent.data_atualizacao,
      prismaEvent.data_inicio_evento,
      prismaEvent.data_fim_evento,
      null,
      null,
      prismaEvent.id
    )

    return event;
  }
  insert(object: Event): Promise<Event> {
    throw new Error('Method not implemented.');
  }
  update(object: Event): Promise<Event> {
    throw new Error('Method not implemented.');
  }
  upsert(object: Event): Promise<Event> {
    throw new Error('Method not implemented.');
  }
  delete(object: Event): Promise<Event> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<Event> {
    throw new Error('Method not implemented.');
  }

}