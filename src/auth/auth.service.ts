import { Injectable } from "@nestjs/common";

import { CredentialService } from "../shared";

@Injectable()
export class AuthService {
  constructor(private _credentialService: CredentialService) {}
}
