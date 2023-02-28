import { INestApplication } from "@nestjs/common";

export function middleware(app: INestApplication): INestApplication {
  // CORS
  app.enableCors({
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "UPDATE", "OPTIONS"],
  });

  return app;
}
