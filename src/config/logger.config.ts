import type { Params } from "nestjs-pino";
import { multistream } from "pino";

export const loggerOptions: Params = {
  pinoHttp: [
    {
      // https://getpino.io/#/docs/api?id=timestamp-boolean-function
      // Change time value in production log.
      // timestamp: stdTimeFunctions.isoTime,
      quietReqLogger: true,
      level: "debug",
      // https://github.com/pinojs/pino-pretty
      transport: {
        target: "pino-pretty",
        options: {
          sync: true,
          singleLine: true,
          colorize: true,
          levelFirst: true,
          ignore: "pid,hostname,service",
        },
      },
    },
    multistream(
      [
        // https://getpino.io/#/docs/help?id=log-to-different-streams
        { level: "debug", stream: process.stdout },
        { level: "error", stream: process.stderr },
        { level: "fatal", stream: process.stderr },
      ],
      { dedupe: true },
    ),
  ],
};
