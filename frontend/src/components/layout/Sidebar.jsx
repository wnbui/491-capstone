import { ListTodo, FileText, Upload, Settings, FolderKanban } from 'lucide-react';

export const Sidebar = ({ activePage, onNavigate }) => {
  const menuItems = [
    { id: 'projects', label: 'Projects', icon: FolderKanban, page: 'main'}, 
    { id: 'tasks', label: 'Tasks', icon: ListTodo, page: 'tasks' },
    { id: 'notes', label: 'Notes', icon: FileText, page: 'notes' },
    { id: 'files', label: 'Upload Files', icon: Upload, page: 'files' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'settings' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.page;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.page)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
