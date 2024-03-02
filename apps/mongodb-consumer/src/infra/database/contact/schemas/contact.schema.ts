import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop({ maxlength: 100, type: String, required: true })
  name: string;

  @Prop({
    type: String,
    unique: true,
    maxlength: 13,
    minlength: 12,
    required: true,
  })
  cellphone: string;

  @Prop({
    type: String,
    maxlength: 100,
    required: false,
  })
  email: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
