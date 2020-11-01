import { Module } from '@nestjs/common';
import User from './entity/user.entity';
import Role from './entity/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { BasicAuthService } from './basic-auth.service';
import RefreshToken from './entity/refreshToken.entity';
import { BasicAuthController } from './basic-auth.controller';
import { JwtStrategy } from './passport/jwt.strategy';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([User, Role, RefreshToken]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    BasicAuthController
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    BasicAuthService,
  ]
})
export class BasicAuthModule {}
