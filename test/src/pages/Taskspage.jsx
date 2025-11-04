import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getTasks, updateTask } from '../services/api';
import { Header } from '../components/layout/Header';
import { TaskList } from '../components/tasks/TaskList';
import { TaskDetailModal } from '../components/tasks/TaskDetailModal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Sidebar } from '../components/layout/Sidebar';

export const TasksPage = ({ onNavigate }) => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      const filters = filter !== 'all' ? { status: filter } : {};
      const data = await getTasks(token, filters);
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    await updateTask(taskId, taskData, token);
    fetchTasks();
  };

  const handleStatusChange = async (taskId, newStatus) => {
    await updateTask(taskId, { status: newStatus }, token);
    fetchTasks();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar activePage="tasks" onNavigate={onNavigate} />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">All Tasks</h1>
              <div className="flex space-x-2">
                {['all', 'todo', 'in_progress', 'in_review', 'done'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      filter === status
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {status === 'all' ? 'All' : status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <TaskList tasks={tasks} title="" />
          </div>
        </main>
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleUpdateTask}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};
