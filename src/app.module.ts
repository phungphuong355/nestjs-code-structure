import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_PIPE, RouterModule } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { LoggerModule } from "nestjs-pino";

import { BaseModule } from "./base";
import { CommonModule, ExceptionsFilter, RolesGuard } from "./common";
import { loggerOptions } from "./config";
import { ModelModule } from "./model";

@Module({
  imports: [
    // https://getpino.io
    // https://github.com/iamolegga/nestjs-pino
    LoggerModule.forRoot(loggerOptions),
    // Configuration
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
    // Database
    // https://docs.nestjs.com/techniques/mongodb
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: `${config.get<string>("DB_TYPE")}://${config.get<string>("DB_HOST")}:${config.get<number>(
          "DB_PORT",
        )}/${config.get<string>("DB_NAME")}`,
      }),
      inject: [ConfigService],
    }),
    // Static Folder
    // https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
      renderPath: "/",
    }),
    // Service Module
    BaseModule,
    CommonModule, // Global
    ModelModule,
    // DebugModelModule,
    // Module Router
    // https://docs.nestjs.com/recipes/router-module
    RouterModule.register([{ path: "model", module: ModelModule }]),
  ],
  providers: [
    // Global Guard, Authentication check on all routers
    { provide: APP_GUARD, useClass: RolesGuard },
    // Global Filter, Exception check
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    // Global Pipe, Validation check
    // https://docs.nestjs.com/pipes#global-scoped-pipes
    // https://docs.nestjs.com/techniques/validation
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // disableErrorMessages: true,
        transform: true, // transform object to DTO class
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      }),
    },
  ],
})
export class AppModule {}
