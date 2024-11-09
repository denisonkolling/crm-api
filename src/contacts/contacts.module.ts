import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Contact } from './entities/contact.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Contact])],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactsModule { }
