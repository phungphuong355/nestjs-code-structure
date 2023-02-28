import { BadRequestException, Injectable } from "@nestjs/common";
import { hash, genSalt } from "bcryptjs";

import { CredentialService } from "../shared";
import { SignUpDto } from "./dtos";

@Injectable()
export class AuthService {
  constructor(private _credentialService: CredentialService) {}

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
}
