import { useState } from 'react';
import { Button, Modal } from '@/core/components';
import { TaskForm } from '@/domain/task/components/TaskForm';
import { Task } from '@/domain/task/types';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Minhas Tarefas</h1>
        <Button onClick={() => setIsModalOpen(true)}>Criar Tarefa</Button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nenhuma tarefa encontrada. Crie uma nova!
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <span className="text-sm font-medium capitalize px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                  {task.priority}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Criar Nova Tarefa">
        <TaskForm onSuccess={handleTaskCreated} />
      </Modal>
    </div>
  );
};

export default HomePage;
