import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Blacklist {
  @Prop({ type: String, trim: true, default: null })
  public token: string;
}

export type BlacklistDocument = HydratedDocument<Blacklist>;

export const BlacklistSchema = SchemaFactory.createForClass(Blacklist);
