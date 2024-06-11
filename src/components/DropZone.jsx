// src/components/DropZone.jsx
import React from 'react';
import DraggableItem from './DraggableItem';

const DropZone = ({ items, onDrop, onDragOver, setItems }) => {
  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleLabelChange = (index, newLabel) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, label: newLabel } : item
    );
    setItems(newItems);
  };

  return (
    <div
      className="relative flex flex-col h-full p-4 bg-gray-50 border-2 border-dashed border-blue-300 rounded-lg w-3/4 shadow-lg overflow-y-auto max-h-full"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {/* Save button at the top */}
      <div className="mb-4 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          Save Form
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">Drag items here</p>
      ) : (
        items.map((item, index) => (
          <DraggableItem
            key={index}
            type={item.type}
            label={item.label || ''}
            onDelete={() => handleDelete(index)}
            onLabelChange={(newLabel) => handleLabelChange(index, newLabel)}
          />
        ))
      )}
    </div>
  );
};

export default DropZone;