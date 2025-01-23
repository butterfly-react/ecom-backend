import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserRequest) {
  

    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      return await this.prismaService.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
        select: {
          email: true,
          id: true,
        },
      });
    } catch (err) {
      console.error('Error during user creation:', err);

      if (err.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists.');
      }
      throw new UnprocessableEntityException('Unexpected error occurred.');
    }
  }

  async getUser(filter: Prisma.UserWhereUniqueInput){
    return this.prismaService.user.findUniqueOrThrow({
      where: filter
    })
  }
}
