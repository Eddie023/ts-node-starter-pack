import { Request, Response, NextFunction } from 'express';

import * as taskService from './taskService';

/**
 * Get the list of all available task.
 *
 * @param req
 * @param res
 * @param next
 */
export function getAllTaskHandler(req: Request, res: Response, next: NextFunction) {
  taskService
    .getAllTask()
    .then((data) => res.json(data))
    .catch((err) => next(err));
}
