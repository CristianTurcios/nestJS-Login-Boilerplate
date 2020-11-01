import { Controller, Get, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from './basic-auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  // @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return 'Welcome!';
  }

}
