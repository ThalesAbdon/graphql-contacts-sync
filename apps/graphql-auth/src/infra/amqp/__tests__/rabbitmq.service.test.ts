import { amqpConnection } from '@graphql-auth/src/shared/__tests__/mocks';
import { RabbitMQService } from '../services/rabbitmq.service';

describe(RabbitMQService.name, () => {
  let rabbitMQService: RabbitMQService;

  beforeEach(() => {
    rabbitMQService = new RabbitMQService(amqpConnection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be rabbitMQService defined', () => {
    expect(rabbitMQService).toBeDefined();
  });

  it('should be rabbitMQService has method send', () => {
    expect(rabbitMQService.send).toBeDefined();
  });

  it('should be called publish method', async () => {
    const spy = jest.spyOn(amqpConnection, 'publish');
    await rabbitMQService.send('test', 'here any data type');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be error publish method', async () => {
    const rabbitMQServiceWithOutAmqp = new RabbitMQService({} as any);

    const spy = jest.spyOn(amqpConnection, 'publish');
    try {
      await rabbitMQServiceWithOutAmqp.send('test', 'here any data type');
    } catch (error) {
      expect(error.message).toBe(
        'this.amqpConnection.publish is not a function',
      );
    } finally {
      expect(spy).toHaveBeenCalledTimes(0);
    }
  });
});
