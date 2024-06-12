// src/components/ToolBoxComponents/ToolBox.jsx
import React from 'react';
import { ResizableBox } from 'react-resizable';
import ToolBoxItem from './ToolBoxItem';
import 'react-resizable/css/styles.css'; // Import the necessary styles for the resizable component

const ToolBox = ({ items }) => {
  return (
    <ResizableBox
      className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-lg h-full"
      width={300} // Adjusted initial width for better visibility
      height={Infinity} // Allow it to stretch vertically
      minConstraints={[200, 100]} // Minimum width and height constraints
      maxConstraints={[500, Infinity]} // Maximum width and unlimited height
      resizeHandles={['e']} // Handle for resizing from the right
    >
      <div className="flex flex-col h-full p-4 space-y-4">
        <h2 className="text-xl font-semibold mb-2 text-center text-gray-900">Toolbox</h2>
        <div className="flex flex-col space-y-3 overflow-auto">
          {items.map((item, index) => (
            <ToolBoxItem key={index} type={item.type} label={item.label} />
          ))}
        </div>
      </div>
    </ResizableBox>
  );
};

export default ToolBox;