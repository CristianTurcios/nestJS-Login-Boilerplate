import { Injectable } from '@nestjs/common';
import User from '../basic-auth/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
    constructor(
        private configService: ConfigService
    ) { }

    async sendEmail(data: any): Promise<any> {
        const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
        
        sgMail.setApiKey(apiKey);
        const msg = {
            to: data.to,
            from: this.configService.get<string>('SENDGRID_EMAIL_FROM'),
            subject: data.subject,
            html: data.html,
        };

        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error('error', error);
        }
    };

    async sendPasswordResetEmail(user: User): Promise<any> {
        let message;
        const origin = this.configService.get<string>('API_URL');
        if (origin) {
            const resetUrl = `${origin}/authentication/change-password?token=${user.resetToken}`;
            message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
        }

        try {
            await this.sendEmail({
                html: `<h4>Reset Password Email</h4>
               ${message}`,
                subject: 'Sign-up Verification API - Reset Password',
                to: user.email,
            });
        } catch (error) {
            console.error('error sending email', error);
        }
    };

    async sendVerificationEmail(user: User): Promise<any> {
        let message;
        const origin = this.configService.get<string>('API_URL');
        if (origin) {
            const verifyUrl = `${origin}/authentication/verify-email?token=${user.verificationToken}`;
            message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
        }

        await this.sendEmail({
            to: user.email,
            subject: 'Sign-up Verification API - Verify Email',
            html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`,
        });
    };
}
