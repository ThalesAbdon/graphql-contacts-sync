// import { Controller } from "@nestjs/common";

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