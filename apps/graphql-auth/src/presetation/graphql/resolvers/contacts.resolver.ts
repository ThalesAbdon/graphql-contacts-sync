import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ContactsResponseOutput } from '@graphql-auth/src/domain/validators/dto/create-contacts.output.dto';
import { SendContactsUsecase } from '@graphql-auth/src/domain/usecases/send-contacts.usecase';
import { ContactsEntity } from '@graphql-auth/src/domain/entities/contacts';
import { AuthGuard } from '@graphql-auth/src/config/auth/auth.guard';
import { Contacts } from '@graphql-auth/src/domain/validators/dto/create-contacts.input.dto';

export const healthCheckQuery = () => String;
export const MutationDecorator = () => ContactsResponseOutput;

@Resolver(ContactsEntity)
export class ContactResolver {
  constructor(private readonly sendContactsUsecase: SendContactsUsecase) {}

  @Query(healthCheckQuery)
  healthCheck(): string {
    return 'API is healthy!';
  }

  @Mutation(MutationDecorator)
  @UseGuards(AuthGuard)
  async sendContactsMongodb(
    @Args('input') input: Contacts,
  ): Promise<ContactsResponseOutput> {
    return await this.sendContactsUsecase.execute(
      input,
      process.env.ROUTE_MONGO,
    );
  }

  @Mutation(MutationDecorator)
  @UseGuards(AuthGuard)
  async sendContactsMysql(
    @Args('input') input: Contacts,
  ): Promise<ContactsResponseOutput> {
    return await this.sendContactsUsecase.execute(
      input,
      process.env.ROUTE_MYSQL,
    );
  }
}
