import { useState, useEffect } from 'react';
import { Plus, ListTodo, Menu } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getProject, getProjectTasks, createTask, updateTask, deleteTask } from '../services/api';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { KanbanBoard } from '../components/tasks/KanbanBoard';
import { TaskDetailModal } from '../components/tasks/TaskDetailModal';
import { Modal } from '../components/common/Modal';
import { TaskForm } from '../components/tasks/TaskForm';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';

export const ProjectDetailPage = ({ projectId, onNavigate }) => {
  const { token } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      const [projectData, tasksData] = await Promise.all([
        getProject(projectId, token),
        getProjectTasks(projectId, token)
      ]);
      setProject(projectData);
      setTasks(tasksData);
    } catch (err) {
      console.error('Failed to fetch project', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    await createTask(taskData, token);
    setShowTaskModal(false);
    fetchProjectData();
  };

  const handleUpdateTask = async (taskId, taskData) => {
    await updateTask(taskId, taskData, token);
    fetchProjectData();
  };

  const handleStatusChange = async (taskId, newStatus) => {
    await updateTask(taskId, { status: newStatus }, token);
    fetchProjectData();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId, token);
    setSelectedTask(null);
    fetchProjectData();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentPage="project" 
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1">
        <Header 
          title={project?.name} 
          showBackButton 
          onBack={() => onNavigate('main')} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 p-2 text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>

          {project?.description && (
            <p className="text-gray-600 mb-4">{project.description}</p>
          )}
          <div className="flex justify-end mb-6">
            <Button onClick={() => setShowTaskModal(true)}>
              <Plus size={20} className="mr-2 inline" />
              New Task
            </Button>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {tasks.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center shadow-sm">
              <ListTodo className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 mb-4">No tasks in this project yet.</p>
              <Button onClick={() => setShowTaskModal(true)}>
                Create First Task
              </Button>
            </div>
          ) : (
            <KanbanBoard 
              tasks={tasks} 
              onTaskClick={(task) => setSelectedTask(task)} 
            />
          )}
        </main>

        <Modal
          isOpen={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          title="Create New Task"
        >
          <TaskForm
            projectId={projectId}
            onSubmit={handleCreateTask}
            onCancel={() => setShowTaskModal(false)}
          />
        </Modal>

        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            isOpen={!!selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdate={handleUpdateTask}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
};
