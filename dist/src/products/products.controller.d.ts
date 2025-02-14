import { CreateProductRequest } from './dto/create-product.request';
import { TokenPayload } from '../auth/token-payload.interface';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(body: CreateProductRequest, user: TokenPayload): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        userId: number;
        sold: boolean;
    }>;
    uploadProductImage(file: Express.Multer.File): void;
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
    getProduct(productId: string): Promise<{
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
}
