import { Eye } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description || 'No description'}
      </p>
      <div className="flex items-center justify-between">
        <StatusBadge status={project.status} />
        <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
          <Eye size={16} />
          <span className="text-sm">View</span>
        </button>
      </div>
    </div>
  );
}