import { Logger } from 'winston';
import Koa from 'koa';
import cors from '@koa/cors';
import dotenv from 'dotenv';
import parser from 'koa-bodyparser';
import { routes } from './routes';
import winston from 'winston';

export class App {
  private readonly port: number;
  private readonly koa: Koa;
  public static log: Logger;

  constructor() {
    dotenv.config();
    this.port = Number(process.env.PORT || 3000);
    this.koa = new Koa();
    this.configKoa();
    this.configLog();
  }

  private configKoa(): void {
    this.koa
      .use(parser())
      .use(cors())
      .use(routes());
  }

  private configLog(): void {
    App.log = winston.createLogger({
      transports: [new winston.transports.Console()]
    })

    this.koa.context.log = App.log
  }

  public start(): void {
    this.koa.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
