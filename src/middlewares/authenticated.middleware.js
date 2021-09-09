import { UnauthorizedException } from '@nestjs/common';

export const authenticatedMiddleware = (req, _res, next) => {
  const nxt = (error) => {
    if (error) {
      next(new UnauthorizedException(error.msg));
    }
    next();
  }
  isUserAuthenticated({})(req, _res, nxt)
}
