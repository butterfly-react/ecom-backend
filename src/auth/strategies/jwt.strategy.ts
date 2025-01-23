import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../token-payload.interface";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService
    ) {
        super({
           jwtFromRequest: ExtractJwt.fromExtractors([
            (request: Request) => {
                const data = request?.cookies['Authentication']
                if (!data) {
                    return null
                }
                return data.access_token
            }
           ]),
           secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate(payload: TokenPayload) {
        return payload;
    }
}
