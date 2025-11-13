import { Request, Response } from 'express';
import { successResponse } from '@/utils/responses/apiResponse';

/**
 * @summary Provides the health status of the API.
 * @param _req - Express request object.
 * @param res - Express response object.
 */
export function getHealthStatus(_req: Request, res: Response): void {
  const healthData = {
    status: 'ok',
    service: 'todo-list-api',
    version: process.env.API_VERSION || 'v1',
  };
  res.status(200).json(successResponse(healthData));
}
