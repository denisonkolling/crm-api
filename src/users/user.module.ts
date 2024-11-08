import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    AccountsModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
