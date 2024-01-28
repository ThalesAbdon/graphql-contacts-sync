// import { MessageHandler } from "@contavoltz/logger";
// import { ICancellationUcApplication } from "@core/providers/application/cancellation-uc-application.interface";
// import { Controller } from "@nestjs/common";
// import { ConsumeMessage } from 'amqplib';

// @Controller()
// export class EventGestaoController {
//   constructor(
//     private readonly _cancellationUcApplication: ICancellationUcApplication,
//   ) {}

//   @MessageHandler('faturamento.energisa.events.invoice.canceled')
//   async sendPayment(message: ConsumeMessage): Promise<void> {
//     await this._cancellationUcApplication.execute(message);
//   }
// }