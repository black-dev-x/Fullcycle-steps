import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'

export class ErrorCreatingAccount extends Error {
  constructor() {
    super(`Error creating account`);
    this.name = 'ProductSlugAlreadyExistsError';
  }
}

@Catch(ErrorCreatingAccount)
export class ErrorCreatingAccountFilter implements ExceptionFilter {
  
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    response.status(403).json({
      statusCode: 403,
      message: exception.message
    })
  }
}
