import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { TokenPayload } from 'src/auth/token-payload.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(req: Request, request: CreateUserRequest): Promise<{
        email: string;
        id: number;
    }>;
    getMe(user: TokenPayload): TokenPayload;
}
