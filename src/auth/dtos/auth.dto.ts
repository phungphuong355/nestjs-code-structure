import { Expose } from "class-transformer";

export class AuthDto {
  @Expose()
  public userId: string;

  @Expose()
  public username: string;

  @Expose()
  public roles: string[];

  @Expose()
  public token: string;
}
