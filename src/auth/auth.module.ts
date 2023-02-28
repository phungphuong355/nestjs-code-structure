import { Module } from "@nestjs/common";

import { CredentialModule } from "../shared";
import { AuthService } from "./auth.service";

@Module({
  imports: [CredentialModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
