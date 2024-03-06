import { Module } from '@nestjs/common';
import { TypeORMModule } from './database/typeorm.module';
import { RabbitmqModule } from './amqp/amqp.module';

@Module({
  imports: [TypeORMModule, RabbitmqModule],
  exports: [TypeORMModule],
})
export class InfraModule {}
