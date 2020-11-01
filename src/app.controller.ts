import {
  Controller, Get,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './basic-auth/guards/jwt-auth.guard';
import { RolesGuard } from './shared/guards/roles';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @SetMetadata('roles', ['admin'])
  getHello(): string {
    return 'Welcome!';
  }
}
