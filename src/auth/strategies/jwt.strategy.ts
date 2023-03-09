import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

import { CONSTANT_JWT } from "../auth.constant";
import { Payload, JwtPayload } from "../auth.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONSTANT_JWT.secret,
    });
  }

  public validate(payload: JwtPayload): Payload {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
