import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

import { BlacklistService } from "../../shared";

@Injectable()
export class TokenVerifyMiddleware implements NestMiddleware {
  constructor(private _blacklistService: BlacklistService) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      const isToken = await this._blacklistService.findByToken(token);
      if (isToken.length) {
        throw new UnauthorizedException("Invalid login!!!");
      }
    }

    req.token = token;

    next();
  }
}
