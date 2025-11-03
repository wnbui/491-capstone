import { useState } from 'react';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { TaskForm } from './TaskForm';

export const TaskDetailModal = ({ task, isOpen, onClose, onUpdate, onStatusChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (formData) => {
    await onUpdate(task.id, formData);
    setIsEditing(false);
    onClose();
  };

  const handleStatusChange = async (newStatus) => {
    await onStatusChange(task.id, newStatus);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isEditing ? 'Edit Task' : task.title}
      maxWidth="max-w-2xl"
    >
      {isEditing ? (
        <TaskForm
          projectId={task.project_id}
          initialData={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
            <p className="text-gray-900">{task.description || 'No description provided'}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
              <StatusBadge status={task.status} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Points</h3>
              <span className="text-gray-900 font-medium">{task.points}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Status Change</h3>
            <div className="flex flex-wrap gap-2">
              {['todo', 'in_progress', 'in_review', 'done'].map((status) => (
                <Button
                  key={status}
                  variant={task.status === status ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => handleStatusChange(status)}
                  disabled={task.status === status}
                >
                  {status.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-6 border-t">
            <Button onClick={() => setIsEditing(true)} className="flex-1">
              Edit Task
            </Button>
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};