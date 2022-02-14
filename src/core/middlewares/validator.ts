import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

import { logger } from '../utils';

/**
 * Validates a value against a Joi schema and throws if validation fails.
 *
 * @param  {T} data
 * @param  {Joi.Schema} schema
 * @returns {Promise<void>}
 */
const validate = async <T>(data: T, schema: Joi.Schema): Promise<void> => {
  return Joi.assert(data, schema, { abortEarly: false });
};

export function schemaValidator(params: Joi.Schema) {
  return async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    try {
      logger.debug('validating schema...');

      await validate(req.body, params);

      next();
    } catch (err: any) {
      next(err);
    }
  };
}
