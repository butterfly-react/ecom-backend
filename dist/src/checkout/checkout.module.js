"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutModule = void 0;
const common_1 = require("@nestjs/common");
const checkout_controller_1 = require("./checkout.controller");
const checkout_service_1 = require("./checkout.service");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = require("@nestjs/config");
const products_module_1 = require("../products/products.module");
let CheckoutModule = class CheckoutModule {
};
exports.CheckoutModule = CheckoutModule;
exports.CheckoutModule = CheckoutModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, products_module_1.ProductsModule],
        controllers: [checkout_controller_1.CheckoutController],
        providers: [checkout_service_1.CheckoutService, {
                provide: stripe_1.default,
                useFactory: (configService) => {
                    return new stripe_1.default(configService.getOrThrow('STRIPE_SECRET_KEY'));
                },
                inject: [config_1.ConfigService]
            }]
    })
], CheckoutModule);
//# sourceMappingURL=checkout.module.js.map