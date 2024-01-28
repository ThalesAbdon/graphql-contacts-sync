import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ContactResolver } from './resolvers/contacts.resolver';
import { SendContactsUsecase } from './usecases/send-contacts.usecase';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'config/auth/auth.guard';

@Module({
  imports: [
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), '/microservices/graphql-auth/src/schema.gql'),
  }),
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '48h' },
  }),
  ],
  controllers: [],
  providers: [AuthGuard,ContactResolver,SendContactsUsecase],
})
export class AppModule {}
