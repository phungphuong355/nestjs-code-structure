import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { BlacklistModule, CredentialModule } from "../shared";
import { AuthService } from "./auth.service";
import { AuthenticatedToken, VerifyTokenMiddleware } from "./middlewares";

@Module({
  imports: [
    CredentialModule,
    BlacklistModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .exclude(
        { path: "api/v1/auth/signup", method: RequestMethod.POST },
        { path: "api/v1/auth/signin", method: RequestMethod.POST },
        { path: "api/v1/health", method: RequestMethod.GET },
      )
      .forRoutes("*")
      .apply(AuthenticatedToken)
      .exclude(
        { path: "api/v1/auth/signup", method: RequestMethod.POST },
        { path: "api/v1/auth/signin", method: RequestMethod.POST },
        { path: "api/v1/health", method: RequestMethod.GET },
      )
      .forRoutes("*");
  }
}
