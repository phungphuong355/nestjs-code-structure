import { Injectable } from "@nestjs/common";

@Injectable()
export class SampleService {
  public stepOne(foo: string) {
    return foo;
  }

  public stepTwo(bar: string) {
    return bar;
  }

  public stepThree() {
    return "step3";
  }

  public stepStart() {
    return this.stepChainOne();
  }

  public stepChainOne() {
    return this.stepChainTwo();
  }

  public stepChainTwo() {
    return this.stepChainThree();
  }

  public stepChainThree() {
    return this.stepChainFour();
  }

  public stepChainFour() {
    return "OK";
  }
}
