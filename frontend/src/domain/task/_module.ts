/**
 * @module task
 * @summary Manages all aspects of tasks, including creation, categorization, and status updates.
 * @domain functional
 * @version 1.0.0
 */

export * from './types';
export * from './services';
export * from './hooks';
export * from './components';

export const moduleMetadata = {
  name: 'task',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['TaskForm'],
  publicHooks: ['useCreateTask'],
  publicServices: ['taskService'],
  publicTypes: ['Task', 'TaskPriority', 'TaskStatus', 'TaskCreatePayload'],
} as const;
