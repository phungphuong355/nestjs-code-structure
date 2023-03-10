import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";

import { Blacklist, BlacklistSchema, Credential, CredentialSchema } from "../schema";
import { BlacklistModule, CredentialModule } from "../shared";
import { AuthService } from "./auth.service";
import { cleanUpDb } from "../../test/util";
import { Payload } from "./auth.interface";

describe("AuthService", () => {
  let service: AuthService;
  let user: Payload;
  let token: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CredentialModule,
        BlacklistModule,
        MongooseModule.forRoot("mongodb://localhost:27017/test"),
        MongooseModule.forFeature([{ name: Credential.name, schema: CredentialSchema }]),
        MongooseModule.forFeature([{ name: Blacklist.name, schema: BlacklistSchema }]),
      ],
      providers: [AuthService, { provide: JwtService, useValue: new JwtService({ secret: "secretKey" }) }],
    }).compile();

    await cleanUpDb();

    service = module.get<AuthService>(AuthService);
  });

  test("should be defined", () => {
    expect(service).toBeDefined();
  });

  test("signUp", async () => {
    const response = await service.signUp({ username: "phuongpt", password: "phuong3005", roles: ["ADM"] });
    expect(response.password).not.toEqual("phuong3005");
    user = response;
  });

  test("signIn", async () => {
    const response = await service.signIn(user);
    expect(response).toHaveProperty("access_token");
    token = response.access_token;
  });

  test("signOut", async () => {
    const response = await service.signOut(token);
    expect(response.access_token).toEqual(token);
  });
});
