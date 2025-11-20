import { useState, useEffect } from 'react';
import { Plus, ListTodo, Archive, ArchiveRestore } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getProject, getProjectTasks, createTask, updateTask, deleteTask, updateProject } from '../services/api';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { KanbanBoard } from '../components/tasks/KanbanBoard';
import { TaskDetailModal } from '../components/tasks/TaskDetailModal';
import { Modal } from '../components/common/Modal';
import { TaskForm } from '../components/tasks/TaskForm';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';

export const ProjectDetailPage = ({ projectId, onNavigate }) => {
  const { token } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

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

  const handleArchiveProject = async () => {
    setIsArchiving(true);
    try {
      const newStatus = project.status === 'archived' ? 'active' : 'archived';
      await updateProject(projectId, { status: newStatus }, token);
      setShowArchiveModal(false);
      await fetchProjectData();
    } catch (err) {
      console.error('Failed to archive/unarchive project', err);
    } finally {
      setIsArchiving(false);
    }
  };

  const isArchived = project?.status === 'archived';

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar activePage="main" onNavigate={onNavigate} />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Project Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-gray-900">{project?.name}</h2>
                    <StatusBadge status={project?.status} />
                  </div>
                  {project?.description && (
                    <p className="text-gray-600 mt-2">{project.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowArchiveModal(true)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                  >
                    {isArchived ? (
                      <>
                        <ArchiveRestore size={20} className="mr-2 inline" />
                        Unarchive Project
                      </>
                    ) : (
                      <>
                        <Archive size={20} className="mr-2 inline" />
                        Archive Project
                      </>
                    )}
                  </button>
                  <Button onClick={() => setShowTaskModal(true)} disabled={isArchived}>
                    <Plus size={20} className="mr-2 inline" />
                    New Task
                  </Button>
                </div>
              </div>
            </div>

            {/* Kanban Board */}
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
          </div>
        </main>
      </div>

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

      <Modal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        title={isArchived ? "Unarchive Project" : "Archive Project"}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {isArchived ? (
              <>
                Are you sure you want to unarchive "<span className="font-medium">{project?.name}</span>"? 
                This will make it visible in your active projects again.
              </>
            ) : (
              <>
                Are you sure you want to archive "<span className="font-medium">{project?.name}</span>"? 
                This will hide it from your main dashboard, but you can restore it later from archived projects. 
                All <span className="font-medium">{tasks.length} tasks</span> will remain intact.
              </>
            )}
          </p>

          <div className="flex space-x-3 pt-4">
            <Button 
              variant="secondary" 
              onClick={() => setShowArchiveModal(false)} 
              className="flex-1"
              disabled={isArchiving}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleArchiveProject} 
              className="flex-1"
              disabled={isArchiving}
            >
              {isArchiving ? 'Processing...' : (isArchived ? 'Unarchive' : 'Archive')}
            </Button>
          </div>
        </div>
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
  );
};
