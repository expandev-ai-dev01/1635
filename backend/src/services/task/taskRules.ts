import { dbRequest, ExpectedReturn } from '@/utils/database/sql';
import { Task, TaskCreatePayload, TaskPriorityNumeric } from './taskTypes';

const priorityMap: Record<string, TaskPriorityNumeric> = {
  baixa: 0,
  media: 1,
  alta: 2,
};

/**
 * @summary Creates a new task in the database.
 * @param payload - The data for the new task.
 * @returns The newly created task entity.
 */
export async function taskCreate(payload: TaskCreatePayload): Promise<Task> {
  const dbParams = {
    idAccount: payload.idAccount,
    title: payload.title,
    description: payload.description,
    dueDate: payload.dueDate,
    priority: priorityMap[payload.priority],
  };

  const result = await dbRequest('[functional].[spTaskCreate]', dbParams, ExpectedReturn.Single);

  return result as Task;
}
