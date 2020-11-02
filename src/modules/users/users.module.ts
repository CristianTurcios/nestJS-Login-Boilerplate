import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';
import User from '../../entity/user.entity';
import Role from '../../entity/role.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [
    UsersService,
    UserResolver,
  ],
})
export class UsersModule {}
