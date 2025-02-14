import { ProductsService } from '../products/products.service';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
export declare class CheckoutService {
    private readonly stripe;
    private readonly productService;
    private readonly configService;
    constructor(stripe: Stripe, productService: ProductsService, configService: ConfigService);
    createSession(productId: number): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    handleCheckoutWebhook(event: any): Promise<void>;
}
