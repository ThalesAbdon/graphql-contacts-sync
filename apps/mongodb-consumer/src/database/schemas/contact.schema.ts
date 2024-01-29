import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    max: 100,
    required: true,
  },
  cellphone: {
    type: String,
    unique: true,
    max: 13,
    min: 12,
    required: true,
  },
  email: {
    type: String,
    max: 100,
    required: false,
  }
});