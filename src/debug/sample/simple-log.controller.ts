import { Get } from "@nestjs/common";

import { Public } from "../../common";
import { LogController } from "./log-controller.decorator";

/**
 * route /test/debug/log/*
 */
@LogController({ context: "Simple", path: "debug/log" })
export class SimpleLogController {
  @Public()
  @Get() // http://localhost:3000/test/debug/log
  public log(): string {
    return "OK";
  }
}
