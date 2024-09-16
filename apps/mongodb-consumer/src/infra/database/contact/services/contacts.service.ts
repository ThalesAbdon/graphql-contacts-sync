import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Contact } from '../schemas/contact.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IMessage } from '@mongodb-consumer/src/shared/interfaces/IMessage.interface';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Pick<Model<Contact>, 'findOne' | 'create'>,
  ) {}

  async create(createContactDto: IMessage): Promise<Contact> {
    createContactDto['_id'] = new mongoose.Types.ObjectId();
    return await this.contactModel.create(createContactDto);
  }

  async findOne(cellphone: string): Promise<Contact> {
    return await this.contactModel.findOne({ cellphone: cellphone });
  }
}
