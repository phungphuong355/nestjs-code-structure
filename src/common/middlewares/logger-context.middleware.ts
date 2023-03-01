import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  // private readonly logger = new Logger("HTTP");
  constructor(private _logger: PinoLogger) {}

  use(request: Request, response: Response, next: NextFunction) {
    response.on("finish", () => {
      const { method, originalUrl } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        return this._logger.error(message);
      }

      if (statusCode >= 400) {
        return this._logger.warn(message);
      }

      return this._logger.info(message);
    });

    next();
  }
}
