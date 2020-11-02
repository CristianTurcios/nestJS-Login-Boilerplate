import { UseGuards, UsePipes } from '@nestjs/common';
import {
  Args, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import { Roles } from '../basic-auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../basic-auth/guards/GqlAuth.guard';
import { AuthValidationPipe } from '../basic-auth/pipes/basic-auth.pipe';
import { DeleteUserDto } from './dto/DeleteUser.dto';
import { PostUserDto } from './dto/PostUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UsersService } from './users.service';
import {
  postUserValidationSchema,
  updateUserValidationSchema,
  deleteUserValidationSchema,
} from './validations/userValidations';

@Resolver('User')
export class UserResolver {
  constructor(
        private usersService: UsersService,
  ) {
    //  Constructor
  }

  @Query('Users')
  @UseGuards(GqlAuthGuard)
  @Roles('Admin', 'Editor', 'Viewer')
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Query('User')
  @UseGuards(GqlAuthGuard)
  @Roles('Admin', 'Editor', 'Viewer')
  async getUserById(@Args('id', { nullable: false }) id: string) {
    return this.usersService.getUserById(id);
  }

  @Mutation('postUser')
  @UseGuards(GqlAuthGuard)
  @Roles('Admin', 'Editor')
  @UsePipes(new AuthValidationPipe(postUserValidationSchema))
  async postUser(@Args() data: PostUserDto) {
    return this.usersService.postUser(data);
  }

  @Mutation('updateUser')
  @UseGuards(GqlAuthGuard)
  @Roles('Admin', 'Editor')
  @UsePipes(new AuthValidationPipe(updateUserValidationSchema))
  async updateUser(@Args() data: UpdateUserDto) {
    return this.usersService.updateUser(data);
  }

  @Mutation('deleteUser')
  @UseGuards(GqlAuthGuard)
  @Roles('Admin', 'Editor')
  @UsePipes(new AuthValidationPipe(deleteUserValidationSchema))
  async deleteUser(@Args() data: DeleteUserDto) {
    return this.usersService.deleteUser(data.id);
  }
}
