import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, ReasonPhrases, StatusCodes } from 'http-status-codes';

import { logger } from '../utils';
import { notify } from '../utils/bugsnag';
import { dbErrorHandler } from '../utils/objection';

interface ErrorResponse {
  data?: any;
  code: StatusCodes;
  message: ReasonPhrases | string | unknown;
}

const parseError = (err: any): ErrorResponse => {
  // handle validation related error.
  if (err instanceof Joi.ValidationError) {
    return {
      code: StatusCodes.BAD_REQUEST,
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
      data:
        err.details &&
        err.details.map((error: any) => ({
          param: error.path.join('.'),
          message: error.message,
        })),
    };
  }

  // Notify unhandled errors to bugsang.
  notify(err);

  return {
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
  };
};

/**
 * Parse error and handle different cases of error.
 *
 * @param  {any} err
 * @param  {Request} req
 * @param  {Response} res
 * @returns {void}
 */
const ErrorHandler = (err: any, req: Request, res: Response, _: NextFunction): void => {
  logger.error(err.stack || err.message);

  // handle database related error.
  dbErrorHandler(err, res);

  const error = parseError(err);

  res.status(error.code).json(error);
};

export default ErrorHandler;
