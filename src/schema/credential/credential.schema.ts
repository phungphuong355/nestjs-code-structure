import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from "uuid";

@Schema()
export class Credential {
  @Prop({ type: String, unique: true, default: uuidv4() })
  public userId: string;

  @Prop({ type: String, trim: true, required: true })
  public username: string;

  @Prop({ type: String, required: true })
  public password: string;

  @Prop({ type: [{ type: String, trim: true, required: true }] })
  public roles: string[];

  @Prop({ type: Boolean, default: false })
  public deleted: boolean;
}

export type CredentialDocument = HydratedDocument<Credential>;

export const CredentialSchema = SchemaFactory.createForClass(Credential);
