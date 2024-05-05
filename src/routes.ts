import Router from 'koa-router'
import { userRoutes } from './user/user-routes';

export const routes = () => {
  const router = new Router();

  router.use(userRoutes())

  return router.routes()
}