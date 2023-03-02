import { ArrayMaxSize, ArrayMinSize, IsEnum, IsString } from "class-validator";
import { ROLES } from "../auth.constant";

export class SignUpDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsEnum(Object(ROLES), { each: true })
  @ArrayMaxSize(1)
  @ArrayMinSize(1)
  public roles: string[];
}
