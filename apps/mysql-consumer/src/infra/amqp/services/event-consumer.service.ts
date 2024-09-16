import { Inject, Injectable } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { ContactService } from '../../database/services/contact.service';
import { IMessage } from '@mysql-consumer/src/interfaces/IMessage.interface';

@Injectable()
export class EventConsumerService {
  constructor(
    @Inject(ContactService) private readonly contactService: ContactService,
  ) {}

  @RabbitRPC({
    exchange: process.env.EXCHANGE,
    routingKey: process.env.ROUTE_MYSQL,
    queue: process.env.QUEUE,
  })
  async saveContacts(messages: IMessage[]): Promise<void> {
    for (const message of messages) {
      message.name = message.name.toUpperCase();
      if (message.cellphone.length == 13) {
        message.cellphone = message.cellphone.replace(
          /(\d{2})(\d{2})(\d{5})(\d{4})/,
          '+$1 ($2) $3-$4',
        );
      } else {
        message.cellphone = message.cellphone.replace(
          /(\d{2})(\d{2})(\d{4})(\d{4})/,
          '+$1 ($2) $3-$4',
        );
      }

      const contactExist = await this.contactService.findOne(message.cellphone);
      if (!contactExist) await this.contactService.create(message);
    }
  }
}
