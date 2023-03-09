import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Payload, JwtPayload } from "../auth.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get<string>("JWT_SECRET"),
    });
  }

  public validate(payload: JwtPayload): Payload {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
