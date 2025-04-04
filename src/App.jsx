// src/App.jsx
import React from 'react';
import './App.css';
import DjangoPipelineDiagram from './components/DjangoPipelineDiagram';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Django Truck Prediction Pipeline Visualization</h1>
        <p className="description">
          Interactive diagram showing the architecture of a military logistics prediction system
        </p>
      </header>
      
      <main className="app-content">
        <div className="diagram-wrapper">
          <DjangoPipelineDiagram />
        </div>
        
        <div className="instructions">
          <h2>Diagram Instructions</h2>
          <ul>
            <li>Use <strong>mouse wheel</strong> to zoom in and out</li>
            <li>Click and <strong>drag</strong> to pan around the diagram</li>
            <li><strong>Hover</strong> over components to see detailed information</li>
            <li>Use the <strong>controls</strong> in the top-right to adjust the view</li>
            <li><strong>Click</strong> on file components to see code snippets</li>
          </ul>
          
          <h3>Key Features</h3>
          <ul>
            <li>End-to-end ML prediction pipeline for military truck logistics</li>
            <li>Advanced feature extraction for optimal predictions</li>
            <li>Caching system for performance optimization</li>
            <li>Error handling with fallback strategies</li>
            <li>Feedback loop for continuous model improvement</li>
          </ul>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Military Logistics Planning System - Django ML Pipeline Architecture</p>
      </footer>
    </div>
  );
}

export default App;