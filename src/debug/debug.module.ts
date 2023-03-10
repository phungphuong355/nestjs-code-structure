import { DynamicModule, Module } from "@nestjs/common";

import { ConfigurableModuleClass, OPTIONS_TYPE } from "./debug.module-definition";

@Module({})
export class DebugModule extends ConfigurableModuleClass {
  public static override forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const module = super.forRoot(options);

    return module;
  }
}
