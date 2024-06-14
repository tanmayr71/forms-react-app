// src/components/ToolBoxComponents/ToolBoxItem.jsx
import React from 'react';
import { useDrag } from 'react-dnd';
import '../../styles/ToolBoxItem.css'; // Import the separate CSS file for styling

const ToolBoxItem = ({ type, label }) => {
  const [, drag] = useDrag({
    type: 'NEW_ITEM',
    item: { type },
  });

  return (
    <div
      ref={drag}
      className="toolbox-item" // Class for the toolbox item
    >
      <span className="toolbox-item-label">{label}</span>
    </div>
  );
};

export default ToolBoxItem;