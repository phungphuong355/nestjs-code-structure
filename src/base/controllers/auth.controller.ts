import { Body, Controller, Get, HttpCode, Post, Req } from "@nestjs/common";
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
  @HttpCode(200)
  public signIn(@Body() body: SignInDto) {
    return this._authService.signIn(body);
  }

  @Get("auth/profile")
  public getProfile(@Req() req: Request) {
    return req.credential;
  }

  @Post("auth/signout")
  public signOut(@Req() req: Request) {
    return this._authService.signOut(req.token);
  }
}
