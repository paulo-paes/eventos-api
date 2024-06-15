import Router from 'koa-router'
import { userRoutes } from './user/user-routes';
import { middlewaresRoutes } from './middleware/middleware-routes';
import { orderRoutes } from './order/order-routes';

export const routes = () => {
  const router = new Router();

  router.use(middlewaresRoutes())
  router.use(userRoutes())
  router.use(orderRoutes())

  return router.routes()
}