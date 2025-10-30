import { FolderKanban } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { Button } from '../common/Button';

export const ProjectList = ({ projects, onProjectClick, onCreateClick }) => {
  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 text-center shadow-sm">
        <FolderKanban className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-600 mb-4">No projects yet. Create your first project!</p>
        <Button onClick={onCreateClick}>Create Project</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onProjectClick(project.id)}
        />
      ))}
    </div>
  );
};