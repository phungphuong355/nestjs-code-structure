import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Credential, CredentialDocument } from "../../schema";

@Injectable()
export class CredentialService {
  constructor(@InjectModel(Credential.name) private _credential: Model<CredentialDocument>) {}
}
