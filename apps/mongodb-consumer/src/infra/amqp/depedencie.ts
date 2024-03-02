import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

export const rabbitMQDependency = [
  RabbitMQModule.forRoot(RabbitMQModule, {
    queues: [
      {
        name: process.env.QUEUE,
        exchange: process.env.EXCHANGE,
        routingKey: [process.env.ROUTE_MONGO, process.env.ROUTE_MYSQL],
        createQueueIfNotExists: false,
      },
    ],
    exchanges: [
      {
        name: process.env.EXCHANGE,
        type: 'topic',
        createExchangeIfNotExists: true,
      },
    ],
    uri: process.env.AMQP,
    enableControllerDiscovery: true,
    connectionInitOptions: { wait: true },
    name: process.env.SERVICE,
  }),
];

/**
 *  RabbitMQModule.forRoot(RabbitMQModule, {
      queues: [
        {
          name: process.env.QUEUE,
          exchange: process.env.EXCHANGE,
          routingKey: [process.env.ROUTE_MONGO, process.env.ROUTE_MYSQL],
          createQueueIfNotExists: false,
        },
      ],
      exchanges: [
        {
          name: process.env.EXCHANGE,
          type: 'topic',
          createExchangeIfNotExists: true,
        },
      ],
      uri: process.env.AMQP,
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: true },
      name: process.env.SERVICE,
    }),
 */
