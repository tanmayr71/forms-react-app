// src/App.jsx
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ToolBox from './components/ToolBoxComponents/ToolBox';
import DropZone from './components/layout/DropZone';

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const toolItems = [
    { type: 'TextBox', label: 'Text Box' },
    { type: 'Radio', label: 'Radio Button' },
    { type: 'Dropdown', label: 'Dropdown' },
    { type: 'Checkbox', label: 'Checkbox' },
  ];

  const handleDrop = (item) => {
    const newItem = {
      type: item.type,
      label: `${item.type} ${droppedItems.length + 1}`,
      id: new Date().getTime(), // Generate a unique id
    };
    setDroppedItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen p-4 space-x-4 bg-gray-100">
        <ToolBox items={toolItems} />
        <DropZone items={droppedItems} setItems={setDroppedItems} onDrop={handleDrop} />
      </div>
    </DndProvider>
  );
};

export default App;