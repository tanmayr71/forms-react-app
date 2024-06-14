// src/components/ToolBoxComponents/ToolBox.jsx
import React from 'react';
import { ResizableBox } from 'react-resizable';
import ToolBoxItem from './ToolBoxItem';
import 'react-resizable/css/styles.css'; // Import the necessary styles for the resizable component
import '../../styles/ToolBox.css'; // Import the separate CSS file for styling

const ToolBox = ({ items }) => {
  return (
    <ResizableBox
      className="toolbox-container" // Class for the container
      width={300} // Adjusted initial width for better visibility
      height={Infinity} // Allow it to stretch vertically
      minConstraints={[200, 100]} // Minimum width and height constraints
      maxConstraints={[500, Infinity]} // Maximum width and unlimited height
      resizeHandles={['e']} // Handle for resizing from the right
    >
      <div className="toolbox-inner">
        <h2 className="toolbox-title">Toolbox</h2>
        <div className="toolbox-items">
          {items.map((item, index) => (
            <ToolBoxItem key={index} type={item.type} label={item.label} />
          ))}
        </div>
      </div>
    </ResizableBox>
  );
};

export default ToolBox;