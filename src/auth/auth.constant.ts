import * as dotenv from "dotenv";
dotenv.config();

export const CONSTANT_JWT = {
  secret: process.env.JWT_SECRET,
};
