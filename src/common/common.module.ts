import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { LoggerContextMiddleware } from "./middlewares";

@Module({})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerContextMiddleware).forRoutes("*");
  }
}
