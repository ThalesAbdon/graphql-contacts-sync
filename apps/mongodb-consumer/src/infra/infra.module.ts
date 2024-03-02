import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RabbitmqModule } from './amqp/rabbitMQ.module';

@Module({
  imports: [DatabaseModule, RabbitmqModule],
  exports: [DatabaseModule],
  providers: [],
})
export class InfraModule {}
