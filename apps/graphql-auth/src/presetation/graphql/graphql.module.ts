import { Module, forwardRef } from '@nestjs/common';
import { graphqlDepedency } from './depedencies/graphql.depedency';
import { jwtDepedency } from '@graphql-auth/src/config/auth/jwt.depedency';
import { AppModule } from '@graphql-auth/src/app.module';
import { RabbitMQService } from '@graphql-auth/src/infra/amqp/services/rabbitmq.service';
import { SendContactsUsecase } from '@graphql-auth/src/domain/usecases/send-contacts.usecase';
import { ContactResolver } from './resolvers/contacts.resolver';
import { AuthGuard } from '@graphql-auth/src/config/auth/auth.guard';

@Module({
  imports: [forwardRef(() => AppModule), graphqlDepedency, jwtDepedency],
  providers: [AuthGuard, ContactResolver, RabbitMQService, SendContactsUsecase],
})
export class GraphqlModule {}
