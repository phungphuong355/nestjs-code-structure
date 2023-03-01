import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";

import { Credential, CredentialDocument, CredentialSchema } from "../../schema";
import { CredentialService } from "./credential.service";
import { cleanUpDb } from "../../../test/util";

describe("CredentialService", () => {
  let service: CredentialService;
  let userId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot("mongodb://localhost:27017/nestjs"),
        MongooseModule.forFeature([{ name: Credential.name, schema: CredentialSchema }]),
      ],
      providers: [CredentialService],
    }).compile();

    await cleanUpDb();

    service = module.get<CredentialService>(CredentialService);
  });

  test("should be defined", () => {
    expect(service).toBeDefined();
  });

  test("create", async () => {
    const response = await service.create({ username: "phuongpt", password: "phuong3005", roles: ["ADM"] });
    expect(response).toBeDefined();
    userId = response.userId;
  });

  test("read", async () => {
    const response = await service.read(userId);
    expect(response).toBeInstanceOf(Model<CredentialDocument>);
  });

  test("update", async () => {
    const response = await service.update(userId, { password: "phuong123" });
    expect(response).toHaveProperty("username");
  });

  test("delete", async () => {
    const response = await service.delete(userId);
    expect(response.deleted).toEqual(true);
  });
});
