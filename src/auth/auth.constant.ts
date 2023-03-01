/* eslint-disable no-unused-vars */
import * as dotenv from "dotenv";
dotenv.config();

export const CONSTANT_JWT = {
  secret: process.env.JWT_SECRET,
  token_length: 3,
};

export enum Roles {
  admin = "ADM",
  user = "USR",
}
