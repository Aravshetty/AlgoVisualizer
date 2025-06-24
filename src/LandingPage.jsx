
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      <div className="landing-content">
        <h1 className="landing-title">AlgoVisualizer</h1>
        
        
        <div className="landing-buttons">
          <Link to="/sorting" className="landing-button">Sorting Visualizer</Link>
          <Link to="/pathfinding" className="landing-button">Pathfinding Visualizer</Link>
        </div>
      </div>
    </div>
  );
}
