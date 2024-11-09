import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Lead } from './entities/lead.entity';
import { CampaignsModule } from 'src/campaigns/campaigns.module';
import { AccountsModule } from 'src/accounts/accounts.module';
import { ContactsModule } from 'src/contacts/contacts.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Lead]),
    CampaignsModule,
    AccountsModule,
    ContactsModule,
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule { }
