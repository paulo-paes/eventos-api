import { PrismaClient } from '@prisma/client';
import { Event } from './model/event';
import { EventRepository } from './event-repository';
import { randomUUID } from 'node:crypto';

export class EventRepositoryImpl implements EventRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async findAll(): Promise<Event[]> {
    const prismaEvents = await this.prismaClient.eventos.findMany({
      orderBy: {
        data_criacao: 'desc'
      }
    })
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
        prismaEvent.preco.toString(),
        prismaEvent.total_ingressos,
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
      prismaEvent.preco.toString(),
      prismaEvent.total_ingressos,
      prismaEvent.id
    )

    return event;
  }

  async update(event: Event): Promise<Event> {
    const prismaEvent = await this.prismaClient.eventos.update({
      where: {
        id: event.id
      },
      data: {
        data_atualizacao: new Date(),
        total_ingressos: event.totalIngressos,
        titulo: event.titulo,
        descricao: event.descricao,
        data_fim_evento: event.dataFimEvento,
        data_inicio_evento: event.dataInicioEvento,
        preco: event.preco
      }
    })

    const evento = new Event(
      prismaEvent.titulo,
      prismaEvent.descricao,
      prismaEvent.data_criacao,
      prismaEvent.data_atualizacao,
      prismaEvent.data_inicio_evento,
      prismaEvent.data_fim_evento,
      null,
      null,
      prismaEvent.preco.toString(),
      prismaEvent.total_ingressos,
      prismaEvent.id
    )

    return evento
  }

  async insert(event: Event): Promise<Event> {
    const prismaEvent = await this.prismaClient.eventos.create({
      data: {
        data_atualizacao: new Date(),
        total_ingressos: event.totalIngressos,
        titulo: event.titulo,
        descricao: event.descricao,
        data_fim_evento: event.dataFimEvento,
        data_inicio_evento: event.dataInicioEvento,
        preco: event.preco,
        usuario_atualizacao: event.usuarioAtualizacao.id,
        usuario_criacao: event.usuarioCriacao.id,
        id: randomUUID()
      }
    })

    const evento = new Event(
      prismaEvent.titulo,
      prismaEvent.descricao,
      prismaEvent.data_criacao,
      prismaEvent.data_atualizacao,
      prismaEvent.data_inicio_evento,
      prismaEvent.data_fim_evento,
      null,
      null,
      prismaEvent.preco.toString(),
      prismaEvent.total_ingressos,
      prismaEvent.id
    )

    return evento
  }
}