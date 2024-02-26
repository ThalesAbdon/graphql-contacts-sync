import { Connection } from 'mongoose';
import { ContactSchema } from '../schemas/contact.schema';

export const contactsProviders = [
  {
    provide: 'CONTACT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('contacts', ContactSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
