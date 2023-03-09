import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { BlacklistModule, CredentialModule } from "../shared";
import { AuthSerializer } from "./auth.serializer";
import { AuthService } from "./auth.service";
import { JwtStrategy, LocalStrategy } from "./strategies";

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
  providers: [AuthService, AuthSerializer, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
