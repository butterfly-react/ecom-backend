import { Body, Controller, Post } from '@nestjs/common';
import { CreateSessionRequest } from './dto/create-session.request';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {

    constructor(private readonly checkoutService: CheckoutService) {}
    @Post('session')
    createCheckoutSession(@Body() request: CreateSessionRequest) {
        return this.checkoutService.createSession(request.productId);
    }
}
