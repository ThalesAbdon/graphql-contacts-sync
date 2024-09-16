import { ContactEntity } from '@mysql-consumer/src/domain/contact/entities/contact.entities';
import { ContactService } from '@mysql-consumer/src/infra/database/services/contact.service';
import { Repository } from 'typeorm';

export const contactModelMock: Pick<
  Repository<ContactEntity>,
  'create' | 'findOne' | 'save'
> = Object.freeze({
  save: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
});

export const contactServiceMock: ContactService = new ContactService(
  contactModelMock,
);
