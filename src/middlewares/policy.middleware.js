import { Logger, UnauthorizedException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import * as axios from 'axios';
import { ERROR_MESSAGE } from '../common/message';

export const policyMiddleware = async (req, _res, next) => {
  try {
    const token = req.headers['authorization'];
    const tokenInfo = await tokenReader.isValidToken(token);

    const input = {
      user: {
        username: tokenInfo.username,
        userInfo: tokenInfo.userInfo,
      }
    };

    const { data: { result } } = await evaluatePolicies(input);

    if (!result) {
      throw new UnauthorizedException(ERROR_MESSAGE.PERMISSION_DENIED);
    }

    req.policies = result;

    next();
  } catch (err) {
    Logger.error('Error while fetching data from OPA', err);
    throw new InternalServerErrorException(ERROR_MESSAGE.INTERNAL_ERROR);
  }
}

export const evaluatePolicies = async input => {
  try {
    const reqBody = { input };
    const reqUrl =
      `${process.env.OPA_HOST}/v1/data/${process.env.OPA_PACKAGE.replace(
        '.',
        '/',
      )}` || 'http://opa:8181/v1/data/policies/example';

    Logger.debug('Fetching data from OPA service, ' + reqUrl);

    return axios.post(reqUrl, reqBody);
  } catch (err) {
    Logger.error('Error while fetching data from OPA', err);
    throw new BadRequestException(ERROR_MESSAGE.INVALID_REQUEST);
  }
};

