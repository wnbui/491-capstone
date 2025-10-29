import { useState, useEffect } from 'react';
import { Plus, FolderKanban } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getProjects, getTasks, createProject } from '../services/api';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { ProjectList } from '../components/projects/ProjectList';
import { TaskList } from '../components/tasks/TaskList';
import { Modal } from '../components/common/Modal';
import { ProjectForm } from '../components/projects/ProjectForm';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';

export const DashboardPage = ({ onNavigate }) => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsData, tasksData] = await Promise.all([
        getProjects(token),
        getTasks(token)
      ]);
      setProjects(projectsData);
      setTasks(tasksData);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (projectData) => {
    await createProject(projectData, token);
    setShowProjectModal(false);
    fetchData();
  };

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
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center space-x-2">
                  <FolderKanban size={28} />
                  <span>Projects</span>
                </h2>
                <Button onClick={() => setShowProjectModal(true)}>
                  <Plus size={20} className="mr-2 inline" />
                  New Project
                </Button>
              </div>

              <ProjectList
                projects={projects}
                onProjectClick={(id) => onNavigate('project', id)}
                onCreateClick={() => setShowProjectModal(true)}
              />
            </div>

            <TaskList tasks={tasks.slice(0, 10)} />
          </div>
        </main>
      </div>

      <Modal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        title="Create New Project"
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setShowProjectModal(false)}
        />
      </Modal>
    </div>
  );
};