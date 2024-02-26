import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Contact } from '../interfaces/IContact.interface';
import { IMessage } from '../interfaces/IMessage.interface';

@Injectable()
export class ContactsService {
  constructor(
    @Inject('CONTACT_MODEL')
    private contactModel: Model<Contact>,
  ) {}

  async create(createContactDto: IMessage): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);
    return await createdContact.save();
  }

  async findOne(cellphone: string): Promise<Contact> {
    const contact = await this.contactModel.findOne({ cellphone });
    return contact;
  }
}
