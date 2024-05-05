import Router from "koa-router";
import { controller } from "./user-factory";

export const userRoutes = () => {
  const router = new Router();

  router.get('/users', controller.getAllUsers.bind(controller));
  router.post('/users', controller.registerUser.bind(controller));

  return router.routes();
};