import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from '../email/email.module';
import User from './entity/user.entity';
import Role from './entity/role.entity';
import { LocalStrategy } from './passport/local.strategy';
import { BasicAuthService } from './basic-auth.service';
import RefreshToken from './entity/refreshToken.entity';
import { BasicAuthController } from './basic-auth.controller';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([User, Role, RefreshToken]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '2h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    BasicAuthController,
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    BasicAuthService,
  ],
})
export class BasicAuthModule {}
