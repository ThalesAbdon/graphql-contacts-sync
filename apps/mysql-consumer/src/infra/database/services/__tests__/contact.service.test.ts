import { ContactService } from '../contact.service';
import { contactModelMock } from '@mysql-consumer/src/shared/__tests__/mocks';

describe(ContactService.name, () => {
  let contactsService: ContactService;
  const message = {
    name: 'unit test',
    cellphone: '558999999999',
    email: null,
  };

  beforeAll(() => {
    contactsService = new ContactService(contactModelMock);
  });

  it('should be contactsService defined', () => {
    expect(contactsService).toBeDefined();
  });

  it('should be execute create method', async () => {
    const spyCreate = jest.spyOn(contactModelMock, 'create').mockReturnValue({
      id: 2,
      ...message,
    } as any);

    const spySave = jest.spyOn(contactModelMock, 'save').mockReturnValue({
      id: 2,
      ...message,
    } as any);

    const data = await contactsService.create(message);

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(spySave).toHaveBeenCalledTimes(1);
    expect(data.id).toBeDefined();
    expect(data.name).toBeDefined();
    expect(data.email).toBeDefined();
  });

  it('should be execute findOne method', async () => {
    const spyCreate = jest.spyOn(contactModelMock, 'findOne').mockReturnValue({
      id: 1,
      ...message,
    } as any);

    const data = await contactsService.findOne(message.cellphone);

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(data.id).toBeDefined();
    expect(data.name).toBe(message.name);
    expect(data.cellphone).toBe(message.cellphone);
  });
});
