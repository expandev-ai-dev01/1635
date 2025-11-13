import { Request, Response } from 'express';
import { errorResponse } from '@/utils/responses/apiResponse';

export const notFoundMiddleware = (_req: Request, res: Response): void => {
  res.status(404).json(errorResponse('The requested resource was not found.', 'NOT_FOUND'));
};
