// src/App.jsx
import React, { useState } from 'react';
import ToolBox from './components/ToolBox';
import DropZone from './components/DropZone';

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const toolItems = [
    { type: 'TextBox', label: 'Text Box' },
    { type: 'Radio', label: 'Radio Button' },
    { type: 'Dropdown', label: 'Dropdown' },
    { type: 'Checkbox', label: 'Checkbox' },
  ];

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('type', type);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    setDroppedItems((prevItems) => [
      ...prevItems,
      { type, label: `${type} ${prevItems.length + 1}` },
    ]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen p-4 space-x-4">
      <ToolBox items={toolItems} onDragStart={handleDragStart} />
      <DropZone items={droppedItems} setItems={setDroppedItems} onDrop={handleDrop} onDragOver={handleDragOver} />
    </div>
  );
};

export default App;