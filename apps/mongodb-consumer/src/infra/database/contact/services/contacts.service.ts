import { Injectable } from '@nestjs/common';
import { IMessage } from '../../../../shared/interfaces/IMessage.interface';
import { Model } from 'mongoose';
import { Contact } from '../schemas/contact.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Pick<Model<Contact>, 'findOne' | 'create'>,
  ) {}

  async create(createContactDto: IMessage): Promise<Contact> {
    return await this.contactModel.create(createContactDto);
  }

  async findOne(cellphone: string): Promise<Contact> {
    return await this.contactModel.findOne({ cellphone: cellphone });
  }
}
