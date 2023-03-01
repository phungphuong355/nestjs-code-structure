import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";

import { AuthService, SignInDto, SignUpDto } from "../../auth";

@Controller("api/v1")
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post("auth/signup")
  public signUp(@Body() body: SignUpDto) {
    return this._authService.signUp(body);
  }

  @Post("auth/signin")
  public signIn(@Body() body: SignInDto) {
    return this._authService.signIn(body);
  }

  @Post("auth/signout")
  public signOut(@Req() req: Request) {}
}
