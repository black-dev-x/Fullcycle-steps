import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductSlugAlreadyExistsError } from './products.errors'
import { NotFoundError } from 'src/common/errors'

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.product.findFirst({ where: { slug: createProductDto.slug } });
    if(product) {
      throw new ProductSlugAlreadyExistsError(product.slug);
    }
    return this.prismaService.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findFirst({ where: { id } });
    if(!product) {
      throw new NotFoundError('Product', id);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prismaService.product.findFirst({ where: { id } });
    if(!product) {
      throw new NotFoundError('Product', id);
    }
    return this.prismaService.product.update({ where: { id }, data: updateProductDto });
  }

  async remove(id: string) {
    const product = await this.prismaService.product.findFirst({ where: { id } });
    if(!product) {
      throw new NotFoundError('Product', id);
    }
    this.prismaService.product.delete({ where: { id } });
  }
}
