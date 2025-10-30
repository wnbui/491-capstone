import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/layout/AuthGuard';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotesPage } from './pages/NotesPage'; 

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const navigate = (page, projectId = null) => {
    setCurrentPage(page);
    if (projectId) {
      setCurrentProjectId(projectId);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      
      case 'register':
        return <RegisterPage onNavigate={navigate} />;
      
      case 'main':
        return <DashboardPage onNavigate={navigate} />;
      
      case 'notes':
        return <NotesPage onNavigate={navigate} />;
      
      default:
        return <LoginPage onNavigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <AuthGuard currentPage={currentPage} onNavigate={navigate}>
        {renderPage()}
      </AuthGuard>
    </AuthProvider>
  );
}

export default App;
