import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { errorResponse } from '@/utils/responses/apiResponse';
import { logger } from '@/utils/logger/logger';

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error('An error occurred:', err);

  if (err instanceof ZodError) {
    res.status(400).json(errorResponse('Validation Error', 'VALIDATION_ERROR', err.errors));
    return;
  }

  // Handle SQL Server specific errors (example)
  if ('number' in err && typeof err.number === 'number') {
    if (err.number >= 50000) {
      // Custom business rule errors from RAISERROR
      res.status(400).json(errorResponse(err.message, 'BUSINESS_RULE_VIOLATION'));
      return;
    }
  }

  const statusCode =
    'statusCode' in err && typeof err.statusCode === 'number' ? err.statusCode : 500;
  const message =
    statusCode === 500 ? 'An unexpected internal server error occurred.' : err.message;
  const code = 'code' in err && typeof err.code === 'string' ? err.code : 'INTERNAL_SERVER_ERROR';

  res.status(statusCode).json(errorResponse(message, code));
};
