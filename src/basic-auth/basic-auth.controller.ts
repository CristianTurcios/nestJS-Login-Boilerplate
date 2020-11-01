import {
  Controller, Get, Post, Body, UsePipes, Request, Res,
  UseGuards, HttpCode, Query, HttpException, HttpStatus, Ip, Param,
} from '@nestjs/common';
import { Response } from 'express';
import { RegisterDto } from './dto/RegisterAuth.dto';
import { ForgotPasswordDto } from './dto/ForgotPassword.dto';
import { ChangePasswordDto } from './dto/ChangePassword.dto';
import { BasicAuthService } from './basic-auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthValidationPipe } from '../shared/pipes/basic-auth.pipe';
import { setTokenCookie } from '../shared/helpers';
import {
  loginSchema,
  verifyEmailValidation,
  forgotPasswordValidation,
  registerValidationSchema,
  changePasswordValidation,
  validateResetTokenValidation,
} from './validations/authValidations';
import { Success } from './interfaces/auth.interface';

@Controller('authentication')
export class BasicAuthController {
  constructor(private basicAuthService: BasicAuthService) {
    // Constructor
  }

    @UsePipes(new AuthValidationPipe(registerValidationSchema))
    @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<Success> {
    return this.basicAuthService.register(registerDto);
  }

    @UseGuards(LocalAuthGuard)
    @UsePipes(new AuthValidationPipe(loginSchema))
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Ip() ipAddress, @Request() req, @Res() res: Response) {
      const auth = await this.basicAuthService.login(req.user, ipAddress);
      const cookieOptions = setTokenCookie();
      res.cookie('token', auth.token, cookieOptions);
      res.cookie('refreshToken', auth.refreshToken, cookieOptions);
      res.send(auth);
    }

    @UsePipes(new AuthValidationPipe(verifyEmailValidation))
    @Get('verify-email')
    @HttpCode(HttpStatus.NO_CONTENT)
    async verifyEmail(@Query() query) {
      const { token } = query;
      return this.basicAuthService.verifyEmail(token);
    }

    @Get('refresh-token')
    async refreshToken(@Request() req, @Res() res: Response) {
      if (!('refreshToken' in req.cookies)) {
        throw new HttpException('Token was not provided', HttpStatus.NOT_FOUND);
      }

      const token = req.cookies.refreshToken;
      const ipAddress = req.ip;
      const auth = await this.basicAuthService.refreshToken(token, ipAddress);

      const cookieOptions = setTokenCookie();
      res.cookie('token', auth.token, cookieOptions);
      res.cookie('refreshToken', auth.refreshToken, cookieOptions);
      res.send(auth);
    }

    @UsePipes(new AuthValidationPipe(forgotPasswordValidation))
    @Post('forgot-password')
    async forgotPassword(@Body() body: ForgotPasswordDto): Promise<Success> {
      return this.basicAuthService.forgotPassword(body.email);
    }

    @Post('change-password/:token')
    async changePassword(@Body() body: ChangePasswordDto, @Param('token') token) {
      const validate = new AuthValidationPipe(changePasswordValidation);
      let data = body;
      data.token = token;
      data = validate.transform(data);
      return this.basicAuthService.changePassword(data.token, data.password);
    }

    @UsePipes(new AuthValidationPipe(validateResetTokenValidation))
    @Get('validate-reset-token')
    async validateResetToken(@Body() resetToken) {
      return this.basicAuthService.validateResetToken(resetToken);
    }
}
