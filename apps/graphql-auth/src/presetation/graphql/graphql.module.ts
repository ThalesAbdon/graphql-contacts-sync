import { Module, forwardRef } from '@nestjs/common';
import { AuthGuard } from '../../config/auth/auth.guard';
import { ContactResolver } from './resolvers/contacts.resolver';
import { RabbitMQService } from '../../infra/amqp/services/rabbitmq.service';
import { SendContactsUsecase } from '../../domain/usecases/send-contacts.usecase';
import { graphqlDepedency } from './depedencies/graphql.depedency';
import { jwtDepedency } from '../../config/auth/jwt.depedency';
import { AppModule } from '../../app.module';

@Module({
  imports: [forwardRef(() => AppModule), graphqlDepedency, jwtDepedency],
  providers: [AuthGuard, ContactResolver, RabbitMQService, SendContactsUsecase],
})
export class GraphqlModule {}
