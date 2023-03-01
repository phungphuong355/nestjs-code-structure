import { Credential } from "../src/schema";

export declare global {
  namespace Express {
    interface Request {
      credential?: Credential;
      token?: string;
    }
  }
}
