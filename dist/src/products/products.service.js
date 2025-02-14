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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const path_1 = require("path");
const product_images_1 = require("./product-images");
const products_gateway_1 = require("./products.gateway");
let ProductsService = class ProductsService {
    constructor(prismaService, productsGateway) {
        this.prismaService = prismaService;
        this.productsGateway = productsGateway;
    }
    async createProduct(data, userId) {
        const product = this.prismaService.product.create({
            data: {
                ...data,
                userId,
            },
        });
        this.productsGateway.handleProductUpdated();
        return product;
    }
    async getProducts(status) {
        const args = {};
        if (status === 'available') {
            args.where = {
                sold: false,
            };
        }
        const products = await this.prismaService.product.findMany(args);
        return Promise.all(products.map(async (product) => ({
            ...product,
            imageExists: await this.imageExists(product.id),
        })));
    }
    async getProduct(productId) {
        try {
            return {
                ...(await this.prismaService.product.findUniqueOrThrow({
                    where: { id: productId },
                })),
                imageExists: await this.imageExists(productId),
            };
        }
        catch (err) {
            throw new common_1.NotFoundException(`Product not found with ID ${productId}`);
        }
    }
    async imageExists(productId) {
        try {
            await fs_1.promises.access((0, path_1.join)(`${product_images_1.PRODUCT_IMAGES}/${productId}.jpg`), fs_1.promises.constants.F_OK);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    async updateProduct(id, data) {
        await this.prismaService.product.update({
            where: { id },
            data
        });
        this.productsGateway.handleProductUpdated();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, products_gateway_1.ProductsGateway])
], ProductsService);
//# sourceMappingURL=products.service.js.map