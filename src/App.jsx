import React from 'react';
import './index.css';
import './Canvas.css';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import WorkflowContextProvider from './context/WorkflowContext';

function App() {
  return (
    <WorkflowContextProvider>
      <div className="app-container">
        <div className="app-header">
          <h1>Workflow Builder</h1>
          <Toolbar />
        </div>
        <Canvas />
      </div>
    </WorkflowContextProvider>
  )
}

export default App
