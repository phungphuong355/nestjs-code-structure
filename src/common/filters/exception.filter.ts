import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly _httpAdapterHost: HttpAdapterHost) {}

  public catch(exception: HttpException | Error, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this._httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = this.getStatusCode(exception);

    const responseBody = {
      respone: this.getHttpResponse(exception),
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private getStatusCode(exception: HttpException | Error) {
    return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getHttpResponse(exception: HttpException | Error) {
    return exception instanceof HttpException ? exception : exception;
  }
}
