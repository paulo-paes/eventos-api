import Router from "koa-router";
import { Context } from "../app";
import { controller } from "./event-factory";

export const eventRoutes = () => {
  const router = new Router<any, Context>();

  router.get("/events", controller.getEvents.bind(controller));
  router.post("/events", controller.addEvent.bind(controller));

  return router.routes();
};
