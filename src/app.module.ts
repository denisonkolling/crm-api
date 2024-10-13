import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ContactsModule } from './contacts/contacts.module';
import { LeadsModule } from './leads/leads.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { TasksModule } from './tasks/tasks.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UserModule, ContactsModule, LeadsModule, OpportunitiesModule, TasksModule, CampaignsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
