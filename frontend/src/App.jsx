import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Notes } from './pages/Notes';
import { Messages } from './pages/Messages';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/messages" element={<Messages />} />
        <Route basename="my-react-app"></Route>
      </Routes>
    </Router>
  );
}

export default App;