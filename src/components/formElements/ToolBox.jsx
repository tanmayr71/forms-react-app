// src/components/ToolBox.jsx
import React from 'react';
import { useDrag } from 'react-dnd';

const ToolBoxItem = ({ type, label }) => {
  const [, drag] = useDrag({
    type: 'NEW_ITEM',
    item: { type },
  });

  return (
    <div
      ref={drag}
      className="p-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
    >
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

const ToolBox = ({ items }) => {
  return (
    <div className="p-4 bg-gray-200 h-full space-y-4 w-1/4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Toolbox</h2>
      {items.map((item, index) => (
        <ToolBoxItem key={index} type={item.type} label={item.label} />
      ))}
    </div>
  );
};

export default ToolBox;