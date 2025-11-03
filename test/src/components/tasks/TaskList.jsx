import { CheckCircle2, Circle, Clock, ListTodo } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const TaskList = ({ tasks, title = 'Recent Tasks' }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 className="text-green-500" size={20} />;
      case 'in_progress':
      case 'in_review':
        return <Clock className="text-yellow-500" size={20} />;
      default:
        return <Circle className="text-gray-400" size={20} />;
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 text-center shadow-sm">
        <ListTodo className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-600">No tasks yet. Create a project and add tasks!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <ListTodo size={28} />
        <span>{title}</span>
      </h2>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  {getStatusIcon(task.status)}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-1">{task.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <StatusBadge status={task.status} />
                  <span className="text-sm text-gray-500">{task.points} pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};