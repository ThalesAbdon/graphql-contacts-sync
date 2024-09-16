import { ContactEntity } from '@mysql-consumer/src/domain/contact/entities/contact.entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '@mysql-consumer/src/infra/database/config/typeorm';
import { ContactService } from './services/contact.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactEntity]),
    TypeOrmModule.forRoot(config),
  ],
  providers: [ContactService],
  exports: [ContactService],
})
export class TypeORMModule {}
