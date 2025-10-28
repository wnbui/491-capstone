import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Notes } from './pages/Notes';
import { Messages } from './pages/Messages';
import { Planner } from './pages/Planner';
import { ProjectManager } from './pages/Projmanager';
import { Files } from './pages/Files';
<<<<<<< Updated upstream
import Login from './components/Login';
import Signup from './components/Signup';
=======
import { Login } from './components/Login'
import  Register  from './components/Register';

>>>>>>> Stashed changes
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
<<<<<<< Updated upstream
        
        <Route path="/notes" element={<Notes />} />
        <Route path="/signup" element={<Signup />} />
=======
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
>>>>>>> Stashed changes
        <Route path="/messages" element={<Messages />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/projmanager" element={<ProjectManager />} />
        <Route path="/files" element={<Files />} />  
      </Routes>
    </Router>
  );
}

export default App;