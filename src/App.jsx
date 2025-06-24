import './App.css';
import PathVisualizer from './PathVisualizer/PathVisualizer.jsx';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './LandingPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sorting" element={<SortingVisualizer />} />
        <Route path="/pathfinding" element={<PathVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;

