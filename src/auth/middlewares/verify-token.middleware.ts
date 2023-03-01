import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

import { BlacklistService } from "../../shared";
import { CONSTANT_JWT } from "../auth.constant";

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  constructor(private _blacklistService: BlacklistService) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new UnauthorizedException("Token is not exist!");
    }

    const isFormattedToken = token.split(".").length === CONSTANT_JWT.token_length;
    if (!isFormattedToken) {
      throw new UnauthorizedException("Token is not correct!");
    }

    const isToken = await this._blacklistService.findByToken(token);
    if (isToken.length) {
      throw new UnauthorizedException("Token has been used!");
    }

    next();
  }
}
