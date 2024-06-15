import Router from "koa-router";
import { controller } from "./order-factory";

export const orderRoutes = () => {
  const router = new Router();

  router.post('/order', controller.registerOrder.bind(controller));

  return router.routes();
};