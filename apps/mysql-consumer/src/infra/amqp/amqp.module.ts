import { Module, forwardRef } from '@nestjs/common';
import { rabbitMQDependency } from './depedencies';
import { EventConsumerService } from './services/event-consumer.service';
import { TypeORMModule } from '../database/typeorm.module';

@Module({
  imports: [forwardRef(() => TypeORMModule), ...rabbitMQDependency],
  providers: [EventConsumerService],
})
export class RabbitmqModule {}
