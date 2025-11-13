import { Task } from '../../types';

export interface TaskFormProps {
  onSuccess: (newTask: Task) => void;
}
