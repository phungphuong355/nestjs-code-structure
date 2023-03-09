export interface JwtSign {
  access_token: string;
}

export interface JwtPayload {
  sub: string;
  userId: string;
  username: string;
  roles: string[];
}

export interface Payload {
  userId: string;
  username: string;
  roles: string[];
}
