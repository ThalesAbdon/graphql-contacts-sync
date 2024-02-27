import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { ContactsEntity } from '../../../domain/entities/contacts';
import { Contacts } from '../../../domain/validators/dto/create-contacts.input.dto';
import { UseGuards } from '@nestjs/common';
import { ContactsResponseOutput } from '../../../domain/validators/dto/create-contacts.output.dto';
import { AuthGuard } from '../../../config/auth/auth.guard';
import { SendContactsUsecase } from '../../../domain/usecases/send-contacts.usecase';

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
