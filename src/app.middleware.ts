import { INestApplication } from "@nestjs/common";
// import compression from "compression";
// import session from "express-session";
// import passport from "passport";

export function middleware(app: INestApplication): INestApplication {
  // app.use(compression());
  // app.use(
  //   session({
  //     secret: "structure",
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: { secure: false },
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());

  // CORS
  // app.enableCors({
  //   methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "UPDATE", "OPTIONS"],
  // });

  return app;
}
