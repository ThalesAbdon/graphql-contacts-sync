import { Inject, Injectable } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { IMessage } from '@mongodb-consumer/src/shared/interfaces/IMessage.interface';
import { ContactsService } from '@mongodb-consumer/src/infra/database/contact/services/contacts.service';

@Injectable()
export class EventConsumerService {
  constructor(
    @Inject(ContactsService) private readonly contactService: ContactsService,
  ) {}

  @RabbitRPC({
    exchange: process.env.EXCHANGE,
    routingKey: process.env.ROUTE_MONGO,
    queue: process.env.QUEUE,
  })
  async saveContacts(messages: IMessage[]): Promise<void> {
    for (const message of messages) {
      const contactExist = await this.contactService.findOne(message.cellphone);
      if (!contactExist) await this.contactService.create(message);
    }
  }
}
