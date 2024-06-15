import Router from "koa-router";
import { userRoutes } from "./user/user-routes";
import { middlewaresRoutes } from "./middleware/middleware-routes";
import { orderRoutes } from "./order/order-routes";
import { Context } from "./app";
import { eventRoutes } from "./event/event-routes";

export const routes = () => {
  const router = new Router<any, Context>();

  router.use(middlewaresRoutes());
  router.use(eventRoutes());
  router.use(userRoutes());
  router.use(orderRoutes());

  return router.routes();
};
