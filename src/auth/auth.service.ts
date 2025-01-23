import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
        private readonly configService: ConfigService,
    ){}


    async login(user: User, response: Response){

        const expires = new Date()

        const jwtExpiration = this.configService.get<string>('JWT_EXPIRATION') as Parameters<typeof ms>[0];
        expires.setTime(expires.getTime() + ms(jwtExpiration))

        

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
