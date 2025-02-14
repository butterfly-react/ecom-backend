import { CreateSessionRequest } from './dto/create-session.request';
import { CheckoutService } from './checkout.service';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    createCheckoutSession(request: CreateSessionRequest): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Checkout.Session>>;
    handleCheckoutWebhook(event: any): Promise<void>;
}
