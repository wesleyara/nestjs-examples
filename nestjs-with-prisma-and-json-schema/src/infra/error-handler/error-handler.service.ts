import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorHandlerProps, ErrorStatus } from './error-handler.interface';

@Injectable()
export class ErrorHandlerService {
  dispatch({ message, status }: ErrorHandlerProps) {
    // Mapeia os status customizados para os status HTTP padrão do NestJS
    const httpStatus = this.mapErrorStatusToHttpStatus(status);
    throw new HttpException(message, httpStatus);
  }

  private mapErrorStatusToHttpStatus(status: ErrorStatus): HttpStatus {
    switch (status) {
      case ErrorStatus.BAD_REQUEST:
        return HttpStatus.BAD_REQUEST;
      case ErrorStatus.UNAUTHORIZED:
        return HttpStatus.UNAUTHORIZED;
      case ErrorStatus.FORBIDDEN:
        return HttpStatus.FORBIDDEN;
      case ErrorStatus.NOT_FOUND:
        return HttpStatus.NOT_FOUND;
      case ErrorStatus.INTERNAL_SERVER_ERROR:
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
