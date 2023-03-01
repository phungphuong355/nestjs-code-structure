import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from "@nestjs/terminus";

/**
 * https://docs.nestjs.com/recipes/terminus
 */
@Controller("api/v1")
export class HealthController {
  constructor(
    private _health: HealthCheckService,
    private _http: HttpHealthIndicator,
    private _db: MongooseHealthIndicator,
  ) {}

  @Get("health")
  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return this._health.check([
      async (): Promise<HealthIndicatorResult> => this._http.pingCheck("dns", "https://1.1.1.1"),
      async (): Promise<HealthIndicatorResult> => this._db.pingCheck("nestjs"),
    ]);
  }
}
