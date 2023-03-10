import { Controller, Get } from "@nestjs/common";

import { SampleService } from "./sample.service";
import { DebugLog } from "../debug-log.decorator";
import { Public } from "../../common";

/**
 * route /test/debug/*
 */
@Controller("debug")
@DebugLog("ClassContext")
export class SampleController {
  constructor(private _sample: SampleService) {}

  @Public()
  @Get() // http://localhost:3000/test/debug
  @DebugLog("MethodContext")
  public step(): string {
    this._sample.stepOne("hello");
    this._sample.stepTwo("world");
    this._sample.stepThree();
    return "OK";
  }

  @Public()
  @Get("chain") // http://localhost:3000/test/debug/chain
  public stepChain(): string {
    return this._sample.stepStart();
  }
}
