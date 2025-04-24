import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseResult } from '../../model/response.model';
import qs from 'qs';
import { Request } from 'express';

@Injectable()
export class TransfromInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    // 处理query参数，将数组参数转换为数组，如 ?a[]=1&a[]=2 => {a: [1, 2]}
    request.query = qs.parse(request.url.split('?').at(1));
    return next.handle().pipe(map(data => new ResponseResult(HttpStatus.OK, data ?? null)));
  }
}
