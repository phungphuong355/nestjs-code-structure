import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";
import { Logger as NestLogger } from "@nestjs/common";

import { middleware } from "./app.middleware";
import { AppModule } from "./app.module";

/**
 * https://docs.nestjs.com
 * https://github.com/nestjs/nest/tree/master/sample
 * https://github.com/nestjs/nest/issues/2249#issuecomment-494734673
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // Express Middleware
  middleware(app);

  await app.listen(process.env.PORT || 3000);

  return app.getUrl();
}

(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(url, "Bootstrap");
  } catch (error) {
    NestLogger.error(error, "Bootstrap");
  }
})();
