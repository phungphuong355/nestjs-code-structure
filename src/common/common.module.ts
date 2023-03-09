import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { BlacklistModule } from "../shared";
import { LoggerContextMiddleware, TokenVerifyMiddleware } from "./middlewares";

@Module({
  imports: [BlacklistModule],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerContextMiddleware).forRoutes("*").apply(TokenVerifyMiddleware).forRoutes("*");
  }
}
