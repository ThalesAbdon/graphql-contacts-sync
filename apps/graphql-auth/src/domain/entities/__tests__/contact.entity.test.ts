import { IContact } from '../../interfaces/IContact.interface';
import { ContactEntity, ContactsEntity, returnField } from '../contacts';

describe(ContactEntity.name, () => {
  let contactEntity: ContactEntity;
  let contactEntities: ContactsEntity;
  const contactProperty: IContact = {
    cellphone: '15988888888',
    email: 'test@gmail.com',
    name: 'Test contact entity',
  };

  beforeEach(() => {
    contactEntity = new ContactEntity(contactProperty);
    contactEntities = new ContactsEntity({ contacts: [contactEntity] });
  });

  it('should be defined contact entity', () => {
    expect(contactEntity).toBeDefined();
  });

  it('should be defined contacts entity', () => {
    expect(contactEntities).toBeDefined();
  });

  it('should be contact entity has property', () => {
    expect(contactEntity.cellphone).toBe(contactProperty.cellphone);
    expect(contactEntity.email).toBe(contactProperty.email);
    expect(contactEntity.name).toBe(contactProperty.name);
  });

  it('should be contact entities has property', () => {
    contactEntities.contacts.forEach((contact) => {
      expect(contact.cellphone).toBe(contactProperty.cellphone);
      expect(contact.email).toBe(contactProperty.email);
      expect(contact.name).toBe(contactProperty.name);
    });
  });

  it('should be defined decorators', () => {
    expect(returnField()).toBe(ContactEntity);
  });
});
