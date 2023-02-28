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
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require("mongoose-autopopulate"));
          return schema;
        },
      },
    ]),
  ],
  providers: [CredentialService],
  exports: [CredentialService],
})
export class CredentialModule {}
