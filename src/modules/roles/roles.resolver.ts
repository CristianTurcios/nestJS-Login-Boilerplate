import { UseGuards, UsePipes } from '@nestjs/common';
import {
  Args, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { PostRoleDto } from './dto/PostRole.dto';
import {
  postRoleValidationSchema,
  updateRoleValidationSchema,
  deleteRoleValidationSchema,
} from './validations/roleValidations';
import { Roles } from '../basic-auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../basic-auth/guards/GqlAuth.guard';
import { AuthValidationPipe } from '../basic-auth/pipes/basic-auth.pipe';
import { UpdateRoleDto } from './dto/UpdateRole.dto';
import { DeleteRoleDto } from './dto/DeleteRole.dto';

@Resolver('Role')
export class RoleResolver {
  constructor(
      private rolesService: RolesService,
  ) {
    //  Constructor
  }

  @Query('Roles')
  @UseGuards(GqlAuthGuard)
  @Roles('Admin', 'Editor', 'Viewer')
  async getUsers() {
    return this.rolesService.getRoles();
  }

  @Query('Role')
  @UseGuards(GqlAuthGuard)
  @Roles('Admin', 'Editor', 'Viewer')
  async getRoleById(@Args('id', { nullable: false }) id: number) {
    return this.rolesService.getRoleById(id);
  }

  @Mutation('postRole')
  @UseGuards(GqlAuthGuard)
  @Roles('Admin', 'Editor')
  @UsePipes(new AuthValidationPipe(postRoleValidationSchema))
  async postRole(@Args() data: PostRoleDto) {
    return this.rolesService.postRole(data.role);
  }

  @Mutation('updateRole')
  @UseGuards(GqlAuthGuard)
  @Roles('Admin', 'Editor')
  @UsePipes(new AuthValidationPipe(updateRoleValidationSchema))
  async updateRole(@Args() data: UpdateRoleDto) {
    return this.rolesService.updateRole(data.id, data.role);
  }

  @Mutation('deleteRole')
  @UseGuards(GqlAuthGuard)
  @Roles('Admin', 'Editor')
  @UsePipes(new AuthValidationPipe(deleteRoleValidationSchema))
  async deleteRole(@Args() data: DeleteRoleDto) {
    return this.rolesService.deleteRole(data.id);
  }
}
