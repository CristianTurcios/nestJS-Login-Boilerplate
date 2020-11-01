import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import User from '../basic-auth/entity/user.entity';
import RefreshToken from '../basic-auth/entity/refreshToken.entity';

export const generateJwtToken = (user: User, jwtSecret: string) => jwt.sign({
    user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role.role,
    },
}, jwtSecret, { expiresIn: '8h' });

export const randomTokenString = () => crypto.randomBytes(40).toString('hex');

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

export const setTokenCookie = () => {
    // create cookie that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    return cookieOptions;
};

export const generateRefreshToken = (user: User, ipAddress: string) => {
    const refreshToken = new RefreshToken();
    refreshToken.user = user;
    refreshToken.createdByIp = ipAddress;
    refreshToken.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    refreshToken.token = randomTokenString();
    return refreshToken;
};
