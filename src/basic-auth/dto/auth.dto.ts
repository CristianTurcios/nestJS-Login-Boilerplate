export class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    acceptTerms: boolean;
    role: number;
}

export class BasicAuthDto {
    email: string;
    password: string;
}

export class ForgotPasswordDto {
    email: string;
}

export class ChangePasswordDto {
    token: string;
    password: string;
    confirmPassword: string;
}