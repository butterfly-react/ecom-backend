import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: User, response: Response): Promise<{
        tokenPayload: import("./token-payload.interface").TokenPayload;
    }>;
}
