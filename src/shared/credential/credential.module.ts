import { Module } from "@nestjs/common";

import { CredentialService } from "./credential.service";

@Module({
  providers: [CredentialService],
  exports: [CredentialService],
})
export class CredentialModule {}
