import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";

import { CredentialService } from "../../shared";
import { CONSTANT_JWT } from "../auth.constant";

@Injectable()
export class AuthenticatedToken implements NestMiddleware {
  constructor(private _credentialService: CredentialService, private _jwtService: JwtService) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new UnauthorizedException("Token is not exist!");
    }

    try {
      const payload = await this._jwtService.verify(token, { secret: CONSTANT_JWT.secret });

      const credential = await this._credentialService.read(payload.userId);
      if (!credential) {
        throw new UnauthorizedException("Please Authorized!");
      }

      req.credential = credential;

      req.token = token;
    } catch (error) {
      throw new UnauthorizedException("Please Authorized!!");
    }
    next();
  }
}
