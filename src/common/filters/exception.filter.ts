import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { PinoLogger } from "nestjs-pino";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private _httpAdapterHost: HttpAdapterHost, private _logger: PinoLogger) {}

  public catch(exception: HttpException | Error, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this._httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = this.getStatusCode(exception);

    const responseBody = {
      response: this.getHttpResponse(exception),
      timestamp: new Date().toLocaleString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (exception instanceof Error) {
        this._logger.error(`${exception.message}: ${httpStatus}`, exception.stack);
      } else {
        // Error Notifications
        this._logger.error("UnhandledException", exception);
      }
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private getStatusCode(exception: HttpException | Error) {
    return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getHttpResponse(exception: HttpException | Error) {
    return exception instanceof HttpException
      ? exception.getResponse()
      : { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: exception.message, error: exception.name };
  }
}
