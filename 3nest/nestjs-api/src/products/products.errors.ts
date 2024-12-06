import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'

export class ProductSlugAlreadyExistsError extends Error {
  constructor(slug: string) {
    super(`Product with slug ${slug} already exists`);
    this.name = 'ProductSlugAlreadyExistsError';
  }
}

@Catch(ProductSlugAlreadyExistsError)
export class ProductSlugAlreadyExistsFilter implements ExceptionFilter {
  
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    response.status(409).json({
      statusCode: 409,
      message: exception.message
    })
  }
}
