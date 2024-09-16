import { IContact } from '@graphql-auth/src/domain/interfaces/IContact.interface';

export const contactProperty: IContact = {
  cellphone: '15988888888',
  email: 'test@gmail.com',
  name: 'Test contact entity',
};

export const validContacts: IContact = {
  cellphone: '5586991127085',
  email: 'testvalid@gmail.com',
  name: 'Test valid',
};
