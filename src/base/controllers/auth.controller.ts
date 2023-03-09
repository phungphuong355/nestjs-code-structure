import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { ReqUser, Serialize } from "../../common";
import { AuthDto, AuthService, JwtAuthGuard, LocalAuthGuard, Payload, SignUpDto } from "../../auth";

@Controller("api/v1")
@Serialize(AuthDto)
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post("auth/signup")
  public signUp(@Body() body: SignUpDto) {
    return this._authService.signUp(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/signin")
  @HttpCode(200)
  public signIn(@ReqUser() user: Payload) {
    return this._authService.signIn(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("auth/profile")
  public getProfile(@ReqUser() user: Payload) {
    return user;
  }

  @Post("auth/signout")
  public signOut(@Req() req: Request) {
    return this._authService.signOut(req.token);
  }
}
