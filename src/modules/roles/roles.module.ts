import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RoleResolver } from './roles.resolver';
import Role from '../../entity/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [
    RoleResolver,
    RolesService,
  ],
})
export class RolesModule {}
