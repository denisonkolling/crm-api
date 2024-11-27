import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities/account.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ContactsModule } from 'src/contacts/contacts.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Account]),
    ContactsModule
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule { }
