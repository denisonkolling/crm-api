import { forwardRef, Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Contact } from './entities/contact.entity';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Contact]),
    forwardRef(() => AccountsModule),
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactsModule { }
