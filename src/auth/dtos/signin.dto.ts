import { IsString } from "class-validator";

export class SignInDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}
