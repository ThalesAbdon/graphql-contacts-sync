import { contactProperty, validContacts } from '../../../shared/__tests__/data';
import { rabbitMQServiceMock } from '../../../shared/__tests__/mocks';
import { Contacts } from '../../validators/dto/create-contacts.input.dto';
import { SendContactsUsecase } from '../send-contacts.usecase';

describe(SendContactsUsecase.name, () => {
  let sendContactUsecase: SendContactsUsecase;

  let contacts: Contacts;

  beforeEach(() => {
    contacts = new Contacts({ contacts: [contactProperty] });
    sendContactUsecase = new SendContactsUsecase(rabbitMQServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be sendContactUsecase defined', () => {
    expect(sendContactUsecase).toBeDefined();
  });

  it('should be sendContactUsecase has method execute', () => {
    expect(sendContactUsecase.execute).toBeDefined();
  });

  it('should not be called execute method with invalid property', async () => {
    const spy = jest.spyOn(rabbitMQServiceMock, 'send');
    const data = await sendContactUsecase.execute(contacts, 'contacts');
    expect(spy).toHaveBeenCalledTimes(0);
    expect(data.invalid).toBeDefined();
    data.invalid.forEach((contact) => {
      expect(contact.cellphone).toBe(contactProperty.cellphone);
      expect(contact.email).toBe(contactProperty.email);
      expect(contact.name).toBe(contactProperty.name);
    });
  });

  it('should be called execute method', async () => {
    const areValidContacts = new Contacts({
      contacts: [validContacts, contactProperty],
    });
    const spy = jest.spyOn(rabbitMQServiceMock, 'send');
    const data = await sendContactUsecase.execute(areValidContacts, 'contacts');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(data.valid).toBeDefined();
    data.valid.forEach((contact) => {
      expect(contact.cellphone).toBe(validContacts.cellphone);
      expect(contact.email).toBe(validContacts.email);
      expect(contact.name).toBe(validContacts.name);
    });
  });

  it('should be called execute method with invalid contact', async () => {
    const areValidContacts = new Contacts({
      contacts: [validContacts, contactProperty],
    });

    const spy = jest.spyOn(rabbitMQServiceMock, 'send');
    const data = await sendContactUsecase.execute(areValidContacts, 'contacts');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(data.valid).toBeDefined();
    data.valid.forEach((contact) => {
      expect(contact.cellphone).toBe(validContacts.cellphone);
      expect(contact.email).toBe(validContacts.email);
      expect(contact.name).toBe(validContacts.name);
    });
    data.valid.forEach((contact) => {
      expect(contact.cellphone).toBe(validContacts.cellphone);
      expect(contact.email).toBe(validContacts.email);
      expect(contact.name).toBe(validContacts.name);
    });
  });

  it('should be error send method', async () => {
    const areValidContacts = new Contacts({ contacts: [validContacts] });

    const sendContactsUsecaseWithoutRabbitMQService = new SendContactsUsecase(
      {} as any,
    );

    const spy = jest.spyOn(rabbitMQServiceMock, 'send');
    try {
      await sendContactsUsecaseWithoutRabbitMQService.execute(
        areValidContacts,
        'contacts',
      );
    } catch (error) {
      expect(error.message).toBe('this.rabbitMQService.send is not a function');
    } finally {
      expect(spy).toHaveBeenCalledTimes(0);
    }
  });
});
