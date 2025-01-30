import { Injectable } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class ProductsService {

    constructor(private readonly prisma: PrismaService) {}

    async createProduct(product: CreateProductRequest, userId: number) {
        return await this.prisma.product.create({
            data: {
                ...product,
                userId
            }
        });
    }

    async getProducts() {
        const products = await this.prisma.product.findMany();

        return Promise.all(products.map(async (product) => ({
            ...product,
            image: await this.imageExists(product.id) ? `${process.env.API_URL}/images/products/${product.id}.jpeg` : null

          
        }))
    );
    }
    private async imageExists(productId: number) {

        try{
            await fs.access(join(__dirname, '..', 'public', 'images', 'products', `${productId}.jpeg`), fs.constants.F_OK);
            return true;
        }catch(error){
            return false;
        }
    }
}
