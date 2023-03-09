import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { Public, ReqUser, Serialize } from "../../common";
import { AuthDto, AuthService, LocalAuthGuard, Payload, SignUpDto } from "../../auth";

/**
 * https://docs.nestjs.com/techniques/authentication
 */
@Controller("api/v1")
@Serialize(AuthDto)
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @Post("auth/signup")
  public signUp(@Body() body: SignUpDto) {
    return this._authService.signUp(body);
  }

  /**
   * See test/e2e/local-auth.spec.ts
   * need username, password in body
   * skip guard to @Public when using global guard
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("auth/signin")
  @HttpCode(200)
  public signIn(@ReqUser() user: Payload) {
    return this._authService.signIn(user);
  }

  @Get("auth/profile")
  public getProfile(@ReqUser() user: Payload) {
    return user;
  }

  @Post("auth/signout")
  public signOut(@Req() req: Request) {
    return this._authService.signOut(req.token);
  }
}
