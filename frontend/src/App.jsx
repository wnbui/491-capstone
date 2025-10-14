import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Notes } from './pages/Notes';
import { Messages } from './pages/Messages';
import { ProjectManager } from './pages/Projmanager';
import { Planner } from './pages/Planner';
import { Files } from './pages/Files';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/project-manager" element={<ProjectManager />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </Router>
  );
}

export default App;