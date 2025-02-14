import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ProductsGateway } from './products.gateway';
export declare class ProductsService {
    private readonly prismaService;
    private readonly productsGateway;
    constructor(prismaService: PrismaService, productsGateway: ProductsGateway);
    createProduct(data: CreateProductRequest, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        userId: number;
        sold: boolean;
    }>;
    getProducts(status?: string): Promise<{
        imageExists: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        userId: number;
        sold: boolean;
    }[]>;
    getProduct(productId: number): Promise<{
        imageExists: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        userId: number;
        sold: boolean;
    }>;
    private imageExists;
    updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<void>;
}
