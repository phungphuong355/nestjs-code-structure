import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Credential, CredentialDocument } from "../../schema";

@Injectable()
export class CredentialService {
  constructor(@InjectModel(Credential.name) private _credential: Model<CredentialDocument>) {}
  // CRUD
  public create(body: Partial<Credential>) {
    const credential = new this._credential({ ...body });

    return this._credential.create(credential);
  }

  public read(userId: string) {
    if (!userId) {
      return null;
    }

    return this._credential.findOne({ userId });
  }

  public async update(userId: string, attr: Partial<Credential>) {
    const credential = await this.read(userId);
    if (!credential) {
      throw new NotFoundException("Credential not found");
    }

    Object.assign(credential, attr);

    return credential.save();
  }

  public async delete(userId: string) {
    const credential = await this.read(userId);
    if (!credential) {
      throw new NotFoundException("Credential not found");
    }
    // Soft delete
    credential.deleted = true;

    return credential.save();
  }

  public findByUsername(username: string) {
    if (!username) {
      return null;
    }

    return this._credential.find({ username });
  }
}
