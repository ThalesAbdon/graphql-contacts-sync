import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { ContactsEntity } from '../entities/contacts';
import { Contacts } from '../dto/create-contacts.input.dto';
import { UseGuards } from '@nestjs/common';
import { ContactsResponseOutput } from '../dto/create-contacts.output.dto';
import { AuthGuard } from '../config/auth/auth.guard';
import { SendContactsUsecase } from '../usecases/send-contacts.usecase';

@Resolver(ContactsEntity)
export class ContactResolver {
  constructor(private readonly sendContactsUsecase: SendContactsUsecase) {}

  @Query(() => String)
  healthCheck(): string {
    return 'API is healthy!';
  }

  @Mutation(() => ContactsResponseOutput)
  @UseGuards(AuthGuard)
  async sendContactsMongodb(
    @Args('input') input: Contacts,
  ): Promise<ContactsResponseOutput> {
    return await this.sendContactsUsecase.execute(
      input,
      process.env.ROUTE_MONGO,
    );
  }

  @Mutation(() => ContactsResponseOutput)
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
