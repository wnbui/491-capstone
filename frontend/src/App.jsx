import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Notes } from './pages/Notes';
import { Messages } from './pages/Messages';
import { Planner } from './pages/Planner';
import { ProjectManager } from './pages/Projmanager';
import { Files } from './pages/Files';
import { Login } from './components/Login'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/projmanager" element={<ProjectManager />} />
        <Route path="/files" element={<Files />} />  
        <Route path="/login" element={<Login />} />     
      </Routes>
    </Router>
  );
}

export default App;