import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { CreateProductRequest } from './dto/create-product.request';
  import { CurrentUser } from '../auth/current-user.decorator';
  import { TokenPayload } from '../auth/token-payload.interface';
  import { ProductsService } from './products.service';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { PRODUCT_IMAGES } from './product-images';
  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard)
    async createProduct(
      @Body() body: CreateProductRequest,
      @CurrentUser() user: TokenPayload,
    ) {
      return this.productsService.createProduct(body, user.userId);
    }
  
    @Post(':productId/image')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: PRODUCT_IMAGES,
          filename: (req, file, callback) => {
            console.log('Product ID:', req.params.productId);
            console.log('Original File Name:', file.originalname);
            const fileName = `${req.params.productId}${extname(file.originalname)}`;
            console.log('Generated File Name:', fileName);
            callback(null, fileName);
            callback(
              null,
              `${req.params.productId}${extname(file.originalname)}`,
            );
          },
        }),
      }),
    )
    uploadProductImage(
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 500000 }),
            new FileTypeValidator({ fileType: 'image/jpeg' }),
          ],
        }),
      )
      file: Express.Multer.File,
    ) {
        console.log('Received file:', file);
  console.log('File name:', file.originalname);
  console.log('File size:', file.size);
  console.log('File mimetype:', file.mimetype);
    }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    async getProducts(@Query('status') status?: string) {


      return this.productsService.getProducts(status);
    }
  
    @Get(':productId')
    @UseGuards(JwtAuthGuard)
    async getProduct(@Param('productId') productId: string) {
      return this.productsService.getProduct(+productId);
    }
  }