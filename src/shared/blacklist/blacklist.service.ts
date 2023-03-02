import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Blacklist, BlacklistDocument } from "../../schema";

@Injectable()
export class BlacklistService {
  constructor(@InjectModel(Blacklist.name) private _blacklist: Model<BlacklistDocument>) {}

  public create(body: Partial<Blacklist>) {
    const blacklist = new this._blacklist({ ...body });

    return this._blacklist.create(blacklist);
  }

  public findByToken(token: string) {
    if (!token) {
      return null;
    }

    return this._blacklist.find({ token });
  }
}
