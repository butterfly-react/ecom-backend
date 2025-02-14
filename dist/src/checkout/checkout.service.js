"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("../products/products.service");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = require("@nestjs/config");
let CheckoutService = class CheckoutService {
    constructor(stripe, productService, configService) {
        this.stripe = stripe;
        this.productService = productService;
        this.configService = configService;
    }
    async createSession(productId) {
        const product = await this.productService.getProduct(productId);
        return await this.stripe.checkout.sessions.create({
            metadata: {
                productId,
            },
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: product.price * 100,
                        product_data: {
                            name: product.name,
                            description: product.description,
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: this.configService.getOrThrow('STRIPE_SUCCESS_URL'),
            cancel_url: this.configService.getOrThrow('STRIPE_CANCEL_URL'),
        });
    }
    async handleCheckoutWebhook(event) {
        if (event.type !== 'checkout.session.completed') {
            return;
        }
        const session = await this.stripe.checkout.sessions.retrieve(event.data.object.id);
        const productId = Number(session.metadata.productId);
        console.log(productId, "productId");
        await this.productService.updateProduct(productId, {
            sold: true,
        });
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stripe_1.default,
        products_service_1.ProductsService,
        config_1.ConfigService])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map