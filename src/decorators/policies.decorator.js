import { createParamDecorator } from '@nestjs/common';

export const Policies = createParamDecorator((_, ctx) => {
  const request = ctx.switchToHttp().getRequest();

  return request.policies;
});
