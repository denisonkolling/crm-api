import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Task } from './entities/task.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { LeadsModule } from '../leads/leads.module';
import { OpportunitiesModule } from '../opportunities/opportunities.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Task]),
    AccountsModule,
    LeadsModule,
    OpportunitiesModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }
