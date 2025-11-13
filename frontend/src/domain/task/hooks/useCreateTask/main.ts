import { useMutation } from '@tanstack/react-query';
import { taskService } from '../../services/taskService';
import { TaskCreatePayload } from '../../types';

/**
 * @hook useCreateTask
 * @summary Hook to create a new task.
 * @domain task
 * @type domain-hook
 * @category data
 */
export const useCreateTask = () => {
  return useMutation({
    mutationFn: (payload: TaskCreatePayload) => taskService.create(payload),
    onError: (error: Error) => {
      console.error('Failed to create task:', error);
    },
  });
};
