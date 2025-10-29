import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/layout/AuthGuard';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Notes } from './pages/Notes';
import { Messages } from './pages/Messages';
import { Planner } from './pages/Planner';
import { ProjectManager } from './pages/Projmanager';
import { Files } from './pages/Files';
import { Settings} from './pages/Settings';
import './App.css';

function App() {
    return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<AuthGuard><Notes /></AuthGuard>} />
          <Route path="/messages" element={<AuthGuard><Messages /></AuthGuard>} />
          <Route path="/planner" element={<AuthGuard><Planner /></AuthGuard>} />
          <Route path="/projmanager" element={<AuthGuard><ProjectManager /></AuthGuard>} />
          <Route path="/files" element={<AuthGuard><Files /></AuthGuard>} />     
          <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      </AuthProvider>
    );
}

export default App;