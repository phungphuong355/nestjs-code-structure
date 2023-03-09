import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private _reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this._reflector.getAllAndOverride<boolean>("isPublic", [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  public getRequest(constext: ExecutionContext): Request {
    return constext.switchToHttp().getRequest<Request>();
  }
}
