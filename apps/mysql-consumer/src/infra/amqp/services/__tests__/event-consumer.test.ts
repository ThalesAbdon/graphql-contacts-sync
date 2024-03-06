import { contactServiceMock } from '@mysql-consumer/src/shared/__tests__/mocks';
import { EventConsumerService } from '../event-consumer.service';

describe(EventConsumerService.name, () => {
  let eventConsumerService: EventConsumerService;
  const message = [
    {
      name: 'unit test',
      cellphone: '558899999999',
    },
  ];

  beforeAll(() => {
    eventConsumerService = new EventConsumerService(contactServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  it('should be saveContacts method execute with contact length 13', async () => {
    const spyCreate = jest.spyOn(contactServiceMock, 'create');
    const spyFindOne = jest.spyOn(contactServiceMock, 'findOne');
    const messageOne = [
      {
        name: 'unit test',
        cellphone: '5588999999999',
      },
    ];
    await eventConsumerService.saveContacts(messageOne);

    expect(spyFindOne).toHaveBeenCalledTimes(1);
    expect(spyCreate).toHaveBeenCalledTimes(1);
  });
});
