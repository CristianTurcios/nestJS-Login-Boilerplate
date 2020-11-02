import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BasicAuthModule } from './modules/basic-auth/basic-auth.module';
import { AppController } from './app.controller';
import { EmailModule } from './modules/email/email.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    EmailModule,
    BasicAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONTAINER_CONNECTION_STRING, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
      user: process.env.MONGO_DB_USER,
      pass: process.env.MONGO_DB_PASSWORD,
      dbName: process.env.MONGO_DB_DATABASE,
      connectTimeoutMS: 60000,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [
          'dist/**/*.entity{.ts,.js}',
        ],
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.ts'],
        cli: {
          migrationsDir: 'src/migration',
        },
        synchronize: true,
        logging: false,
      }),
    }),
    GraphQLModule.forRoot({
      include: [
        UsersModule,
        RolesModule,
      ],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/schemas/graphql.ts'),
      },
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
