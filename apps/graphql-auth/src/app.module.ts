import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ContactResolver } from './resolvers/contacts.resolver';
import { SendContactsUsecase } from './usecases/send-contacts.usecase';
import { JwtModule } from '@nestjs/jwt';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AuthGuard } from './config/auth/auth.guard';
import { RabbitMQService } from './services/rabbitmq.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/apps/graphql-auth/src/schema.gql'),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '48h' },
    }),
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
  controllers: [],
  providers: [AuthGuard, ContactResolver, RabbitMQService, SendContactsUsecase],
})
export class AppModule {}
