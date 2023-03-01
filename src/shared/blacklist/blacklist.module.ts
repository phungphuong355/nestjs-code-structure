import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Blacklist, BlacklistSchema } from "../../schema";
import { BlacklistService } from "./blacklist.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Blacklist.name,
        useFactory: () => {
          const schema = BlacklistSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require("mongoose-autopopulate"));
          return schema;
        },
      },
    ]),
  ],
  providers: [BlacklistService],
  exports: [BlacklistService],
})
export class BlacklistModule {}
