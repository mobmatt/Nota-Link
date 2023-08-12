import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Outlet /> {/* Display child components based on active route */}
    </div>
  );
}

export default App;
