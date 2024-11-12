import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ContactsModule } from './contacts/contacts.module';
import { LeadsModule } from './leads/leads.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { TasksModule } from './tasks/tasks.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { EventsModule } from './events/events.module';
import { AccountsModule } from './accounts/accounts.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TagsModule } from './tags/tags.module';
import mikroOrmConfig from './config/mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    UserModule,
    ContactsModule,
    LeadsModule,
    OpportunitiesModule,
    TasksModule,
    CampaignsModule,
    EventsModule,
    AccountsModule,
    TagsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
