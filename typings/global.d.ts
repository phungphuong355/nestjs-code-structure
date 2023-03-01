export declare global {
  namespace Express {
    interface Request {
      credential?: unknown;
      token?: string;
    }
  }
}
