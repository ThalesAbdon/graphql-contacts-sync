import { Module, forwardRef } from '@nestjs/common';
import { rabbitMQDependency } from './depedencie';
import { EventConsumerService } from './services/event-consumer.service';
import { ContactModule } from '../database/contact/contact.module';

@Module({
  imports: [forwardRef(() => ContactModule), ...rabbitMQDependency],
  exports: [],
  providers: [EventConsumerService],
})
export class RabbitmqModule {}
