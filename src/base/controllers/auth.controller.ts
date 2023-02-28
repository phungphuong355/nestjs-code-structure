import { Body, Controller, Post } from "@nestjs/common";

import { AuthService, SignUpDto } from "../../auth";

@Controller("api/v1")
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post("auth/signup")
  public signUp(@Body() body: SignUpDto) {
    return this._authService.signUp(body);
  }
}
