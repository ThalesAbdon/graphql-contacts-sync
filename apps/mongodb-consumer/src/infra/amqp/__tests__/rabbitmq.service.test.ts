import { contactServiceMock } from '../../../shared/__tests__/mocks';
import { EventConsumerService } from '../services/event-consumer.service';

describe(EventConsumerService.name, () => {
  let eventConsumerService: EventConsumerService;

  beforeEach(() => {
    eventConsumerService = new EventConsumerService(contactServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be EventConsumerService defined', () => {
    expect(eventConsumerService).toBeDefined();
  });

  // it('should be EventConsumerService has method send', () => {
  //   expect(eventConsumerService.send).toBeDefined();
  // });
});
