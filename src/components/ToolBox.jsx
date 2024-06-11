// src/components/ToolBox.jsx
import React from 'react';

const ToolBox = ({ items, onDragStart }) => {
  return (
    <div className="p-4 bg-gray-200 h-full space-y-4 w-1/4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Toolbox</h2>
      {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => onDragStart(e, item.type)}
          className="p-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
        >
          <span className="text-sm font-medium text-gray-700">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ToolBox;