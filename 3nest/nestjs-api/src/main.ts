import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductSlugAlreadyExistsFilter, ResourceNotFoundErrorFilter } from './products/products.errors'
import { ValidationPipe } from '@nestjs/common'
import { ErrorCreatingAccountFilter } from './auth/auth.errors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new ProductSlugAlreadyExistsFilter(), 
    new ErrorCreatingAccountFilter(),
    new ResourceNotFoundErrorFilter());
  
  app.useGlobalPipes(
    new ValidationPipe(
      { 
        errorHttpStatusCode: 422, 
        transform: true, 
        transformOptions: 
          { 
            enableImplicitConversion: true 
          } 
      }));
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
