import { ArrayMaxSize, ArrayMinSize, IsEnum, IsString } from "class-validator";
import { Roles } from "../auth.constant";

export class SignUpDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsEnum(Object(Roles), { each: true })
  @ArrayMaxSize(1)
  @ArrayMinSize(1)
  public roles: string[];
}
