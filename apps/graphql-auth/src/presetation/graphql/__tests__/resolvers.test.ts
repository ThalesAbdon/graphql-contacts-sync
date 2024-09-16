import { SendContactsUsecase } from '@graphql-auth/src/domain/usecases/send-contacts.usecase';
import {
  ContactResolver,
  MutationDecorator,
  healthCheckQuery,
} from '../resolvers/contacts.resolver';
import { rabbitMQServiceMock } from '@graphql-auth/src/shared/__tests__/mocks';
import {
  contactProperty,
  validContacts,
} from '@graphql-auth/src/shared/__tests__/data';
import { ContactsResponseOutput } from '@graphql-auth/src/domain/validators/dto/create-contacts.output.dto';

describe(ContactResolver, () => {
  let contactResolver: ContactResolver;
  let sendContactUsecase: SendContactsUsecase;
  beforeAll(() => {
    sendContactUsecase = new SendContactsUsecase(rabbitMQServiceMock);
    contactResolver = new ContactResolver(sendContactUsecase);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined contactResolver', () => {
    expect(contactResolver).toBeDefined();
  });

  it('should be defined healthCheck', () => {
    expect(contactResolver.healthCheck).toBeDefined();
  });

  it('should be defined sendContactsMongodb', () => {
    expect(contactResolver.sendContactsMongodb).toBeDefined();
  });

  it('should be defined sendContactsMysql', () => {
    expect(contactResolver.sendContactsMysql).toBeDefined();
  });

  it('should be called healthCheck', () => {
    const data = contactResolver.healthCheck();
    expect(data).toBe('API is healthy!');
  });

  it('should be called sendContactsMongodb', async () => {
    const spySendContactUsecase = jest.spyOn(sendContactUsecase, 'execute');
    const spyRabbitMQService = jest.spyOn(rabbitMQServiceMock, 'send');
    const data = await contactResolver.sendContactsMongodb({
      contacts: [validContacts, contactProperty],
    });
    expect(spySendContactUsecase).toHaveBeenCalledTimes(1);
    expect(spyRabbitMQService).toHaveBeenCalledTimes(1);
    expect(data.invalid.length).toBeGreaterThanOrEqual(1);
    expect(data.valid.length).toBeGreaterThanOrEqual(1);
  });

  it('should be called sendContactsMysql', async () => {
    const spySendContactUsecase = jest.spyOn(sendContactUsecase, 'execute');
    const spyRabbitMQService = jest.spyOn(rabbitMQServiceMock, 'send');
    const data = await contactResolver.sendContactsMysql({
      contacts: [validContacts, contactProperty],
    });
    expect(spySendContactUsecase).toHaveBeenCalledTimes(1);
    expect(spyRabbitMQService).toHaveBeenCalledTimes(1);
    expect(data.invalid.length).toBeGreaterThanOrEqual(1);
    expect(data.valid.length).toBeGreaterThanOrEqual(1);
  });

  it('should be defined decorators', () => {
    expect(healthCheckQuery()).toBe(String);
    expect(MutationDecorator()).toBe(ContactsResponseOutput);
  });
});
