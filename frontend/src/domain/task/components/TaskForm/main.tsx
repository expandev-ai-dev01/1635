import { useState, FormEvent } from 'react';
import { useCreateTask } from '../../hooks/useCreateTask';
import { TaskCreatePayload, TaskPriority } from '../../types';
import { Button, Input, Select, Textarea } from '@/core/components';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { TaskFormProps } from './types';

interface FormErrors {
  title?: string;
  description?: string;
  dueDate?: string;
}

export const TaskForm = ({ onSuccess }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('media');
  const [errors, setErrors] = useState<FormErrors>({});

  const createTaskMutation = useCreateTask();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!title.trim()) {
      newErrors.title = 'O título da tarefa é obrigatório';
    } else if (title.trim().length < 3) {
      newErrors.title = 'O título deve ter pelo menos 3 caracteres';
    } else if (title.length > 100) {
      newErrors.title = 'O título deve ter no máximo 100 caracteres';
    }

    if (!description.trim()) {
      newErrors.description = 'A descrição da tarefa é obrigatória';
    } else if (description.length > 500) {
      newErrors.description = 'A descrição deve ter no máximo 500 caracteres';
    }

    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(dueDate) < today) {
        newErrors.dueDate = 'A data de vencimento não pode ser anterior à data atual';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const payload: TaskCreatePayload = {
      title: title.trim(),
      description: description.trim(),
      priority,
    };

    if (dueDate) {
      payload.dueDate = new Date(dueDate).toISOString();
    }

    createTaskMutation.mutate(payload, {
      onSuccess: (data) => {
        onSuccess(data);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('media');
        setErrors({});
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Data de Vencimento
        </label>
        <Input
          id="dueDate"
          name="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={errors.dueDate ? 'border-red-500' : ''}
        />
        {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
          Prioridade
        </label>
        <Select
          id="priority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </Select>
      </div>

      {createTaskMutation.isError && (
        <div className="text-red-600 bg-red-100 p-3 rounded">
          Erro ao criar tarefa: {createTaskMutation.error.message}
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={createTaskMutation.isPending}>
          {createTaskMutation.isPending ? <LoadingSpinner size="sm" /> : 'Criar Tarefa'}
        </Button>
      </div>
    </form>
  );
};
