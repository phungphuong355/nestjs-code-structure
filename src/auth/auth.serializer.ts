import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

import type { Payload } from "./auth.interface";

@Injectable()
export class AuthSerializer extends PassportSerializer {
  public serializeUser(user: Payload, done: (_err: Error | null, _data?: Payload) => void): void {
    done(null, user);
  }

  public deserializeUser(data: Payload, done: (_err: Error | null, _user?: Payload) => void): void {
    try {
      done(null, data);
    } catch (err) {
      done(<Error>err);
    }
  }
}
