/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";

export interface ClassConstructor {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (..._args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor {
  constructor(private _dto: any) {}

  public intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
    // Run something before a request is handled
    // by the request handler

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        return {
          response: {
            statusCode: context.switchToHttp().getResponse<Response>().statusCode,
            statusMessage: context.switchToHttp().getResponse<Response>().statusMessage,
            result: plainToClass(this._dto, data, { excludeExtraneousValues: true }),
            timestamp: new Date().toLocaleString(),
            path: context.switchToHttp().getRequest<Request>().path,
          },
        };
      }),
    );
  }
}
