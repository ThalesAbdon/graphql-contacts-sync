import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQService } from '@graphql-auth/src/infra/amqp/services/rabbitmq.service';

export const amqpConnection: Pick<AmqpConnection, 'publish'> = Object.freeze({
  publish: jest.fn(),
});

export const rabbitMQServiceMock: RabbitMQService = new RabbitMQService(
  amqpConnection,
);
