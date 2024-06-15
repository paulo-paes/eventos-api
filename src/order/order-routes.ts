import Router from "koa-router";
import { controller } from "./order-factory";
import { Context } from "../app";

export const orderRoutes = () => {
  const router = new Router<any, Context>();

  router.post("/order", controller.registerOrder.bind(controller));
  router.get("/order", controller.getOrders.bind(controller));

  return router.routes();
};
