import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { TaskForm } from './TaskForm';

export const TaskDetailModal = ({ task, isOpen, onClose, onUpdate, onStatusChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (formData) => {
    await onUpdate(task.id, formData);
    setIsEditing(false);
    onClose();
  };

  const handleStatusChange = async (newStatus) => {
    await onStatusChange(task.id, newStatus);
    onClose();
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete task:', error);
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
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
      ) : showDeleteConfirm ? (
        <div className="space-y-6">
          <div className="text-center py-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Task</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete "<span className="font-medium">{task.title}</span>"? 
              This action cannot be undone.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="secondary" 
              onClick={handleCancelDelete} 
              className="flex-1"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeleteConfirm} 
              className="flex-1"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Task'}
            </Button>
          </div>
        </div>
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
            <Button 
              variant="danger" 
              onClick={handleDeleteClick}
              className="flex items-center justify-center space-x-2"
            >
              <Trash2 size={16} />
              <span>Delete</span>
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
