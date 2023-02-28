import { ArrayMaxSize, ArrayMinSize, IsString } from "class-validator";

export class SignUpDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @ArrayMaxSize(1)
  @ArrayMinSize(1)
  public roles: string[];
}
