import Router from "koa-router";
import { authMiddleware } from './middleware-factory';
import { Context } from "../app";

export const middlewaresRoutes = () => {
  const router = new Router<any, Context>();
  
  router.use(authMiddleware.validate.bind(authMiddleware))

  return router.routes();
};