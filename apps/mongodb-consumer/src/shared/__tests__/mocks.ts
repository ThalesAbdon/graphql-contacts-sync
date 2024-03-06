import { Model } from 'mongoose';
import { ContactsService } from '@mongodb-consumer/src/infra/database/contact/services/contacts.service';
import { Contact } from '@mongodb-consumer/src/infra/database/contact/schemas/contact.schema';

export const contactModelMock: Pick<
  Model<Contact>,
  'findOne' | 'create'
> = Object.freeze({
  findOne: jest.fn(),
  create: jest.fn(),
});

export const contactServiceMock: ContactsService = new ContactsService(
  contactModelMock,
);
