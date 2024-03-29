import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { EventConsumerService } from './services/event-consumer.service';
import { ContactsService } from './services/contacts.service';
import { contactsProviders } from './database/providers/documents.providers';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    DatabaseModule,
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
  providers: [ContactsService, ...contactsProviders, EventConsumerService],
})
export class AppModule {}
