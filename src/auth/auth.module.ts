import { Module } from "@nestjs/common";

import { BlacklistModule, CredentialModule } from "../shared";
import { AuthService } from "./auth.service";

@Module({
  imports: [CredentialModule, BlacklistModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
