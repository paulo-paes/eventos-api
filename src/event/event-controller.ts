import bigDecimal from "js-big-decimal";
import { Context } from "../app";
import { EventRequest } from "./dto/event-request";
import { EventService } from "./event-service";

export class EventController {
  constructor(private eventService: EventService) {}

  async addEvent(ctx: Context) {
    const eventRequest = JSON.parse(ctx.request.rawBody) as EventRequest;

    if (!eventRequest) {
      ctx.body = {
        message: "Informe os campos necessários!"
      }
      ctx.status = 400
      return
    }
    if (!eventRequest.dataInicio || !eventRequest.dataFim) {
      ctx.body = {
        message: "data inicio e fim devem ser informadas!"
      }
      ctx.status = 400
      return
    }

    eventRequest.dataInicio = new Date(eventRequest.dataInicio)
    eventRequest.dataFim = new Date(eventRequest.dataFim)

    if (!eventRequest.titulo || !eventRequest.descricao) {
      ctx.body = {
        message: "titulo e descrição devem ser informados!"
      }
      ctx.status = 400
      return
    }

    if (!eventRequest.preco || !eventRequest.totalIngressos) {
      ctx.body = {
        message: "preço e total de ingressos devem ser informados!"
      }
      ctx.status = 400
      return
    }

    ctx.body = await this.eventService.insert(eventRequest, ctx.user)
    ctx.status = 201

  }
  async getEvents(ctx: Context) {
    ctx.body = await this.eventService.getEvents()
  }
}