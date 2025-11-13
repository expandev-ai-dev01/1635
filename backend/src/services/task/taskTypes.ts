export type TaskPriority = 'baixa' | 'media' | 'alta';
export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';

export type TaskPriorityNumeric = 0 | 1 | 2;
export type TaskStatusNumeric = 0 | 1 | 2 | 3;

/**
 * @interface Task
 * @description Represents a task entity as stored in the database.
 */
export interface Task {
  idTask: number;
  idAccount: number;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: TaskPriorityNumeric;
  status: TaskStatusNumeric;
  dateCreated: Date;
  dateModified: Date;
  deleted: boolean;
}

/**
 * @interface TaskCreatePayload
 * @description Defines the structure for creating a new task.
 */
export interface TaskCreatePayload {
  idAccount: number;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: TaskPriority;
}
