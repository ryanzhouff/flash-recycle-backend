import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * 捕获所有异常
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor() {
    this.registerUnhandledExceptions();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const url = request.originalUrl;

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException ? exception.message : 'Internal Server Error';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(exception, undefined, 'Catch');
    } else {
      this.logger.warn(`${decodeURIComponent(url)} ${status} ${message}`);
    }

    response.status(status).json({
      code: status,
      message,
      data: null,
      path: request.originalUrl,
    });
  }

  registerUnhandledExceptions() {
    process.on('uncaughtException', err => {
      console.log('未捕获异常: ', err);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.log('unhandled promise: ', promise, 'reason: ', reason);
    });
  }
}
