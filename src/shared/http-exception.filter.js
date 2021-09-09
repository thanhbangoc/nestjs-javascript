import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InputValidationError } from './inputValidationError';
import { ERROR_MESSAGE } from '../common/message';

@Catch()
export class HttpExceptionFilter {
  catch(exception, host) {
    Logger.log(exception);
    const response = host.switchToHttp().getResponse();

    if (exception instanceof InputValidationError) {
      return response.status(HttpStatus.BAD_REQUEST).json(exception.getErrors());
    } 

    if(exception instanceof HttpException) {
      const errorRes = {
        status: exception.getStatus(),
        source: {
          pointer: '',
        },
        detail: exception.message,
      };

      return response.status(exception.getStatus()).json(errorRes);
    }

    const errorRes = {
      status: exception.getStatus(),
      source: {
        pointer: '',
      },
      detail: ERROR_MESSAGE.INTERNAL_ERROR,
    };

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorRes);
  }
}
