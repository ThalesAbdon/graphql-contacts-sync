import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop({
    _id: true,
  })
  _id: mongoose.Types.ObjectId;

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
