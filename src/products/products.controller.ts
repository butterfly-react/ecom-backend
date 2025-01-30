import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { CreateProductRequest } from './dto/create-product.request';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    createProduct(@Body() product: CreateProductRequest,
                    @CurrentUser() user: TokenPayload) {
        return this.productsService.createProduct(product, Number(user.userId));
    }

    @Post(':productId/image')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('image',{
            storage: diskStorage({
            destination: './public/products',
            filename: (req, file, callback) => {
               callback(null, `${req.params.productID}${extname(file.originalname)}`)
            }
            }),
        }),
    )
    uploadProductImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({maxSize: 5000000}),
                    new FileTypeValidator({fileType: 'image/jpeg'}),
                ]
            })

        )
        _file: Express.Multer.File
    ){}

    @Get()
    @UseGuards(JwtAuthGuard)
    getProducts() {
        return this.productsService.getProducts();
    }
}
