import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Event } from './entities/event.entity';
import { AccountsModule } from 'src/accounts/accounts.module';
import { LeadsModule } from 'src/leads/leads.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Event]),
    AccountsModule,
    LeadsModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule { }
