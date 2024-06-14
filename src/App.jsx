// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FormCreator from './components/FormCreator';
import FormViewer from './components/FormViewer';
import NavBar from './components/NavBar'; // Import the new NavBar component

const App = () => {
  return (
    <div>
      <NavBar /> {/* Use the NavBar component */}
      <Routes>
        <Route path="/" element={<FormCreator />} />
        <Route path="/view" element={<FormViewer />} />
      </Routes>
    </div>
  );
};

export default App;