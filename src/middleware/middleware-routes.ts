import Router from "koa-router";
import { authMiddleware } from './middleware-factory';

export const middlewaresRoutes = () => {
  const router = new Router();
  
  router.use(authMiddleware.validate.bind(authMiddleware))

  return router.routes();
};