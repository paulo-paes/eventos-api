import { User } from '../user/model/user';
import { EventRequest } from './dto/event-request';
import { EventRepository } from './event-repository';
import { Event } from './model/event';
export class EventService {
  constructor(private eventRepository: EventRepository) {}
  async getEvents() {
    return this.eventRepository.findAll()
  }

  async insert(eventRequest: EventRequest, user: User) {
    const event = new Event(
      eventRequest.titulo,
      eventRequest.descricao,
      new Date(),
      new Date(),
      eventRequest.dataInicio,
      eventRequest.dataFim,
      user,
      user,
      eventRequest.preco,
      eventRequest.totalIngressos
    )
    return this.eventRepository.insert(event)
  }
}