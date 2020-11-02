import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../../entity/user.entity';
import Role from '../../entity/role.entity';
import { hashPassword, randomTokenString } from '../basic-auth/helpers/helpers';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
        private emailService: EmailService,

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

  async postUser(data) {
    if (await this.usersRepository.findOne({ email: data.email })) { throw new Error('User already exists'); }
    const role = await this.rolesRepository.findOne({ id: data.role });

    if (!role) { throw new Error('Invalid role id'); }

    const user = new User();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.acceptTerms = data.acceptTerms;
    user.role = role;
    user.isVerified = false;
    user.verificationToken = randomTokenString();
    user.password = hashPassword(data.password);

    const errors = await validate(user);
    if (errors.length > 0) { throw new Error(errors.toString()); }
    try {
      await this.usersRepository.save(user);
      await this.emailService.sendVerificationEmail(user);
      return user;
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }

  async updateUser(data) {
    const user = await this.usersRepository.findOne({ id: data.id }, { relations: ['role'] });

    if (!user) { throw new Error('User not found'); }

    if (data.email && user.email !== data.email
      && await this.usersRepository.findOne({ email: data.email })) {
      throw new Error('email already taken');
    }

    if (data.role && user.role.role !== data.role) {
      const role = await this.rolesRepository.findOne({ id: data.role });
      if (!role) { throw new Error('Invalid role id'); }
    }

    const newArgs = { ...data };
    delete newArgs.id;
    Object.assign(user, newArgs);

    try {
      await this.usersRepository.save(user);
      return user;
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOne({ id });

    if (!user) { throw new Error('User not found'); }

    try {
      await this.usersRepository.remove(user);
      user.id = id;
      return user;
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
}
