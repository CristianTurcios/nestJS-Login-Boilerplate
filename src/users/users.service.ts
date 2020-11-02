import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../basic-auth/entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
  ) {
    // Constructor
  }

  async getUsers() {
    const users = await this.usersRepository.find({ relations: ['role'] });
    return users;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({ id }, { relations: ['role'] });
    if (!user) { throw new Error('User not found'); }

    return user;
  }

  // async postUser(data) {
  //   // const role = await rolesRepository.findOne({ id: data.role });
  //   const user = new User();
  //   user.firstName = data.firstName;
  //   user.lastName = data.lastName;
  //   user.email = data.email;
  //   user.acceptTerms = data.acceptTerms;
  //   user.role = role;
  //   user.isVerified = false;
  //   user.verificationToken = randomTokenString();
  //   user.password = hashPassword(password);
  // }
}
