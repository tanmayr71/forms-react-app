// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FormCreator from './components/FormCreator';
import FormViewer from './components/FormViewer';

const App = () => {
  return (
    <div>
      <nav className="p-4 bg-blue-600 text-white flex justify-between">
        <Link to="/" className="text-lg font-bold">Form Creator</Link>
        <Link to="/view" className="text-lg font-bold">Form Viewer</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FormCreator />} />
        <Route path="/view" element={<FormViewer />} />
      </Routes>
    </div>
  );
};

export default App;