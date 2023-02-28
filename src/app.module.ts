import { Module } from "@nestjs/common";

import { BaseModule } from "./base";

@Module({
  imports: [
    // Service Module
    BaseModule,
  ],
})
export class AppModule {}
