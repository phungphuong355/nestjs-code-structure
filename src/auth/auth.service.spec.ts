import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";

import { Credential, CredentialSchema } from "../schema";
import { CredentialModule } from "../shared";
import { AuthService } from "./auth.service";
import { cleanUpDb } from "../../test/util";

describe("AuthService", () => {
  let service: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot("mongodb://localhost:27017/nestjs"),
        MongooseModule.forFeature([{ name: Credential.name, schema: CredentialSchema }]),
        CredentialModule,
      ],
      providers: [AuthService],
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
  });
});
