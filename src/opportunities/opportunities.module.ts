import { Module } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { OpportunitiesController } from './opportunities.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Opportunity } from './entities/opportunity.entity';
import { UserModule } from 'src/users/user.module';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Opportunity]),
    UserModule,
    AccountsModule
  ],
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService],
  exports: [OpportunitiesService]
})
export class OpportunitiesModule { }
