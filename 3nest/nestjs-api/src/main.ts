import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductSlugAlreadyExistsFilter } from './products/products.errors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ProductSlugAlreadyExistsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
