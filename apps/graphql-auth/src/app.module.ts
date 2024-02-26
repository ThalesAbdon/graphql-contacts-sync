import { Module } from '@nestjs/common';
import { RabbitmqModule } from './infra/amqp/rabbitMQ.module';
import { GraphqlModule } from './presetation/graphql/graphql.module';

@Module({
  exports: [RabbitmqModule],
  imports: [RabbitmqModule, GraphqlModule],
})
export class AppModule {}
