import { LogOut, Orbit } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { LuCircleUserRound } from 'react-icons/lu';

export const Header = ({ title = 'unison', showBackButton, onBack }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {showBackButton && (
          <button
            onClick={onBack}
            className="text-blue-700 hover:text-blue-400 mb-2 flex items-center space-x-1"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Orbit className="text-blue-600" size={36} />
            <h1 className="font-serif font-bold text-4xl text-shadow-lg text-orange-700">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              <LuCircleUserRound size={30} className="mr-2 inline"/><span className="font-medium text-orange-700">{user?.username}</span>
            </span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-blue-700 hover:bg-blue-100 rounded-lg transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};