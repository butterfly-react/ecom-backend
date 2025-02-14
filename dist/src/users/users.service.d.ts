import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createUser(data: CreateUserRequest): Promise<{
        email: string;
        id: number;
    }>;
    getUser(filter: Prisma.UserWhereUniqueInput): Promise<{
        email: string;
        password: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
