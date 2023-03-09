import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

import { AuthService } from "../auth.service";
import { Payload } from "../auth.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Payload> {
    const user = await this._authService.validateUser(username, password);

    return { userId: user.userId, username: user.username, roles: user.roles };
  }
}
