import { BadRequestException, Injectable } from "@nestjs/common";
import { hash, genSalt, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { BlacklistService, CredentialService } from "../shared";
import { CONSTANT_JWT } from "./auth.constant";
import { SignInDto, SignUpDto } from "./dtos";

@Injectable()
export class AuthService {
  constructor(private _credentialService: CredentialService, private _blacklistService: BlacklistService) {}

  public async signUp(body: SignUpDto) {
    const usernames = await this._credentialService.findByUsername(body.username);
    if (usernames.length) {
      throw new BadRequestException("username in use");
    }

    const salt = await genSalt(10);

    body.password = await hash(body.password, salt);

    const credential = this._credentialService.create({ ...body });

    return credential;
  }

  public async signIn(body: SignInDto) {
    const [user] = await this._credentialService.findByUsername(body.username);
    if (!user) {
      throw new BadRequestException("Invalid login!");
    }

    const isMatch = await compare(body.password, user.password);
    if (!isMatch) {
      throw new BadRequestException("Invalid login!!");
    }

    const token = sign({ userId: user.userId }, CONSTANT_JWT.secret);

    return { token };
  }

  public signOut(token: string) {
    const inputedToken = this._blacklistService.create({ token });

    return inputedToken;
  }
}
