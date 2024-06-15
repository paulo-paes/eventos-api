import Router from "koa-router";
import { controller } from "./user-factory";

export const userRoutes = () => {
  const router = new Router();

  router.post('/register', controller.registerUser.bind(controller));
  router.post('/login', controller.login.bind(controller));

  return router.routes();
};