import { createParamDecorator } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { InputValidationError } from '../shared/inputValidationError';

export const Validate = createParamDecorator(async (data, ctx) => {
  const request = ctx.switchToHttp().getRequest();

  if (request.body?.data?.attributes) {
    const object = plainToClass(data, request.body.data.attributes);
    try {
      await validateOrReject(object);
    } catch (errors) {
      throw new InputValidationError(errors);
    }
  }
});
