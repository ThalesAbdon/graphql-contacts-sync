import mongoose from 'mongoose';
import { contactModelMock } from '../../../../../shared/__tests__/mocks';
import { ContactsService } from '../contacts.service';

describe(ContactsService.name, () => {
  let contactsService: ContactsService;
  const message = {
    name: 'unit test',
    cellphone: '558999999999',
    email: null,
  };

  beforeAll(() => {
    contactsService = new ContactsService(contactModelMock);
  });

  it('should be contactsService defined', () => {
    expect(contactsService).toBeDefined();
  });

  it('should be execute create method', async () => {
    const spyCreate = jest.spyOn(contactModelMock, 'create').mockReturnValue({
      _id: new mongoose.Types.ObjectId(),
      ...message,
    } as any);

    const data = await contactsService.create(message);

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(data._id).toBeDefined();
    expect(data.name).toBeDefined();
    expect(data.email).toBeDefined();
  });

  it('should be execute findOne method', async () => {
    const _id = new mongoose.Types.ObjectId();
    const spyCreate = jest.spyOn(contactModelMock, 'findOne').mockReturnValue({
      _id,
      ...message,
    } as any);

    const data = await contactsService.findOne(message.cellphone);

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(data._id).toBeDefined();
    expect(data.name).toBe(message.name);
    expect(data.cellphone).toBe(message.cellphone);
  });
});
