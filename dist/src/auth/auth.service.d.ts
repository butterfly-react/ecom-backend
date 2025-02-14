import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class AuthService {
    private readonly usersService;
    private readonly configService;
    private readonly jwtService;
    constructor(usersService: UsersService, configService: ConfigService, jwtService: JwtService);
    login(user: User, response: Response): Promise<{
        tokenPayload: TokenPayload;
    }>;
    verifyUser(email: string, password: string): Promise<{
        email: string;
        password: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    verifyToken(jwt: string): void;
}
