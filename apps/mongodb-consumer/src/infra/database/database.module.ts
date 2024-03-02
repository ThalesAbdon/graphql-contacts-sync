import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [databaseProviders],
  providers: [ContactModule],
  exports: [ContactModule],
})
export class DatabaseModule {}
