import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Credential, CredentialSchema } from "../../schema";
import { CredentialService } from "./credential.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Credential.name,
        useFactory: () => {
          const schema = CredentialSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [CredentialService],
  exports: [CredentialService],
})
export class CredentialModule {}
