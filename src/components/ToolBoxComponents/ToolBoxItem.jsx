// src/components/ToolBoxComponents/ToolBoxItem.jsx
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
      className="p-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-200 hover:border-blue-400 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
    >
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </div>
  );
};

export default ToolBoxItem;