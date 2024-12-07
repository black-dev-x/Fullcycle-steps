import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PrismaModule, ProductsModule, AuthModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
