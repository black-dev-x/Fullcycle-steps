import { Module, OnModuleInit } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements OnModuleInit {

  constructor(private productService: ProductsService, private prismaService: PrismaService) {}

  private async initializeMockData() {
    await this.prismaService.product.deleteMany();
    new Array(10).fill(0).forEach( async (_, index) => {
      await this.productService.create({
        name: `Product ${index}`,
        description: `Description ${index}`,
        slug: `product-${index}`,
        price: Math.random() * 1000,
      });
    })
  }
  async onModuleInit() {
    this.initializeMockData()
  }

}
