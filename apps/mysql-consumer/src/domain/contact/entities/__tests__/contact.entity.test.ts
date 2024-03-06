import { ContactEntity } from '../contact.entities';

describe(ContactEntity.name, () => {
  it('should be defined', () => {
    expect(ContactEntity).toBeDefined();
  });

  it('should have attributes', () => {
    const input = {
      cellphone: '000000000000',
      email: 'test@gmail.com',
      id: 1,
      name: 'Test unity',
    };
    const entity = new ContactEntity(input);

    Object.keys(entity).forEach((key) => {
      expect(entity[key]).toBe(input[key]);
    });
  });
});
