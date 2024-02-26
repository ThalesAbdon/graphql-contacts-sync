import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { EventConsumerService } from './services/event-consumer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/typeorm';
import { ContactService } from './services/contact.service';
import { ContactEntity } from './entities/contact.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactEntity]),
    TypeOrmModule.forRoot(config),
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
  ],
  providers: [ContactService, EventConsumerService],
})
export class AppModule {}
