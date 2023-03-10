import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";

import { Blacklist, BlacklistSchema } from "../../schema";
import { cleanUpDb } from "../../../e2e/util";
import { BlacklistService } from "./blacklist.service";

describe("CredentialService", () => {
  let service: BlacklistService;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJ1c2VySWQiOiI1NjE3MTMzZS1lZDE0LTQ4MjYtOTNiZi02ZTZlYzBjMTUyMzYiLCJpYXQiOjE2Nzc3MjkzMTJ9." +
    "6gbh4FA92MPwi1Li3QxJOQQSn_BIO2WA5rnC1VuRuFU";

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot("mongodb://localhost:27017/test"),
        MongooseModule.forFeature([{ name: Blacklist.name, schema: BlacklistSchema }]),
      ],
      providers: [BlacklistService],
    }).compile();

    await cleanUpDb();

    service = module.get<BlacklistService>(BlacklistService);
  });

  test("should be defined", () => {
    expect(service).toBeDefined();
  });

  test("create", async () => {
    const response = await service.create({ token });
    expect(response.token).toEqual(token);
  });

  test("findByToken", async () => {
    const response = await service.findByToken(token);
    expect(response.length).toEqual(1);
  });
});
