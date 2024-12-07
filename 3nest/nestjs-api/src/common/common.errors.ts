import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express'

export class NotFoundError extends Error {
  constructor(entity: string, value: string, key: string = 'id') {
    super(`${entity} with ${key} ${value} not found`);
    this.name = 'NotFoundError';
  }
}

@Catch(NotFoundError)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log("Cai no filter?")
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    response.status(404).json({
      statusCode: 404,
      message: exception.message
    });
  }
}
