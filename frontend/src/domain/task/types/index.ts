export type TaskPriority = 'baixa' | 'media' | 'alta';
export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TaskCreatePayload {
  title: string;
  description: string;
  dueDate?: string;
  priority?: TaskPriority;
}
