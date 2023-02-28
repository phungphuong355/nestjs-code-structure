import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Credential {
  @Prop({ required: true })
  public userId!: string;

  @Prop({ required: true })
  public username!: string;

  @Prop({ required: true })
  public password!: string;
}

export type CredentialDocument = HydratedDocument<Credential>;

export const CredentialSchema = SchemaFactory.createForClass(Credential);
