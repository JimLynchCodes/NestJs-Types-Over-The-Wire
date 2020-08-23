import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs';
import { classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, T> {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(map(data => classToPlain(data) as T));
  }
}