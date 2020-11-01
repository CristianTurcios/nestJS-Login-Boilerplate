import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BasicAuthService } from '../basic-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private basicAuthService: BasicAuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<any> {
    const token = await this.basicAuthService.validateUser(email, password);

    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }
}
