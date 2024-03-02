import { contactServiceMock } from '../../../../shared/__tests__/mocks';
import { EventConsumerService } from '../event-consumer.service';

describe(EventConsumerService.name, () => {
  let eventConsumerService: EventConsumerService;
  const message = [
    {
      name: 'unit test',
      cellphone: '558999999999',
    },
  ];

  beforeAll(() => {
    eventConsumerService = new EventConsumerService(contactServiceMock);
  });

  it('should be EventConsumerService defined', () => {
    expect(eventConsumerService).toBeDefined();
  });

  it('should be saveContacts method execute', async () => {
    const spyCreate = jest.spyOn(contactServiceMock, 'create');
    const spyFindOne = jest.spyOn(contactServiceMock, 'findOne');

    await eventConsumerService.saveContacts(message);

    expect(spyFindOne).toHaveBeenCalledTimes(1);
    expect(spyCreate).toHaveBeenCalledTimes(1);
  });
});
