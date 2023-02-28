import { Module } from "@nestjs/common";

import { CredentialModule } from "../shared";

@Module({
  imports: [CredentialModule],
})
export class AuthModule {}
