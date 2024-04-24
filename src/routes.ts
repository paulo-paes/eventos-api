import Router from 'koa-router'

export const routes = () => {
  const router = new Router();

  router.get('/', async (ctx: any) => {
    const allUsers = await ctx.prisma.usuarios.findMany()
    ctx.body = allUsers
  })

  return router.routes()
}