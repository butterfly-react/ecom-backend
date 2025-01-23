import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ){}


    async login(user: User, response: Response){

        const expires = new Date()

        const jwtExpiration = this.configService.getOrThrow<string>('JWT_EXPIRATION') as Parameters<typeof ms>[0];
        expires.setTime(expires.getTime() + ms(jwtExpiration))

        
        const tokenPayload: TokenPayload = {
            userId: user.id.toString()
        }

        const token = this.jwtService.sign(tokenPayload)

        response.cookie('Authentication', token, {
            secure: true,
            httpOnly: true,
            expires
        

        })

        return { tokenPayload }

    }

    async verifyUser(email: string, password: string){

        try{

            const user = await this.usersService.getUser({email})
            const authenticated =await bcrypt.compare(password, user.password)

            if(!authenticated) throw new UnauthorizedException('Credentials are not valid')
            return user

        }catch (err) {

            throw new UnauthorizedException('Credentials are not valid')

        }

    }
}
