import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductSlugAlreadyExistsFilter } from './products/products.errors'
import { ValidationPipe } from '@nestjs/common'
import { NotFoundFilter } from './common/errors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ProductSlugAlreadyExistsFilter(), new NotFoundFilter());
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422}));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
