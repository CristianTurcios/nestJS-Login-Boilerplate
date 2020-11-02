export class UpdateUserDto {
    id: string;

    email?: string;

    firstName?: string;

    lastName?: string;

    role?: number;

    acceptTerms?: boolean;
}
