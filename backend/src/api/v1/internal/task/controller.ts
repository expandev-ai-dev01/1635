import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { successResponse } from '@/utils/responses/apiResponse';
import { taskCreate } from '@/services/task';
import { TaskCreatePayload, TaskPriority } from '@/services/task/taskTypes';
import { zTitle, zDescription } from '@/utils/zod/zodValidation';

const taskCreateSchema = z.object({
  title: zTitle,
  description: zDescription,
  dueDate: z
    .string()
    .datetime({ message: 'dueDate must be a valid ISO 8601 date string' })
    .optional(),
  priority: z.enum(['baixa', 'media', 'alta']).default('media'),
});

/**
 * @summary Handles the creation of a new task.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = taskCreateSchema.parse(req.body);

    // In a real application, user and account info would come from an auth middleware.
    // const { idAccount } = req.user;
    const idAccount = 1; // Placeholder for development

    const payload: TaskCreatePayload = {
      idAccount,
      title: body.title,
      description: body.description,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      priority: body.priority as TaskPriority,
    };

    const createdTask = await taskCreate(payload);

    res.status(201).json(successResponse(createdTask));
  } catch (error) {
    next(error);
  }
}
