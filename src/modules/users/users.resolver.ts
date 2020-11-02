import { UseGuards } from '@nestjs/common';
import {
  Args, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import { Roles } from '../basic-auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../basic-auth/guards/GqlAuth.guard';
import { UsersService } from './users.service';

@Resolver('User')
export class UserResolver {
  constructor(
        private usersService: UsersService,
  ) {
    //  Constructor
  }

  @Query('Users')
  @UseGuards(GqlAuthGuard)
  @Roles('Admin')
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Query('User')
  async getUserById(@Args('id', { nullable: false }) id: string) {
    return this.usersService.getUserById(id);
  }

  @Mutation('postUser')
  async postUser(
      @Args('firstName', { nullable: false }) firstName: string,
      @Args('lastName', { nullable: false }) lastName: string,
      @Args('email', { nullable: false }) email: string,
      @Args('password', { nullable: false }) password: string,
      @Args('confirmPassword', { nullable: false }) confirmPassword: string,
      @Args('acceptTerms', { nullable: false }) acceptTerms: boolean,
      @Args('role', { nullable: false }) role: number,
  ) {
    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      acceptTerms,
      role,
    };
    console.log('postUser', user);
  }
}
