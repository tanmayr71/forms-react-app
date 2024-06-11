// src/components/DraggableItem.jsx
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import TextBoxCard from './TextBoxCard';
import RadioButtonCard from './RadioButtonCard';
import CheckboxCard from './CheckboxCard';
import DropdownCard from './DropdownCard';

const DraggableItem = ({ type, label, onDelete, onLabelChange }) => {
  const [editableLabel, setEditableLabel] = useState(label || '');

  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setEditableLabel(newLabel);
    onLabelChange(newLabel);
  };

  let Component;
  switch (type) {
    case 'TextBox':
      Component = TextBoxCard;
      break;
    case 'Radio':
      Component = RadioButtonCard;
      break;
    case 'Dropdown':
      Component = DropdownCard;
      break;
    case 'Checkbox':
      Component = CheckboxCard;
      break;
    default:
      Component = null;
  }

  return (
    <div className="relative m-2 p-4 border border-gray-300 rounded bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="flex-grow">
          <input
            type="text"
            value={editableLabel}
            onChange={handleLabelChange}
            className="text-sm font-medium text-gray-700 border p-2 rounded w-full"
            placeholder="Enter heading here"
          />
          <div className="text-xs text-gray-500 mt-1">Type: {type}</div>
        </div>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 ml-4"
          aria-label="Delete"
        >
          <MdDelete className="h-5 w-5" />
        </button>
      </div>
      {Component && <Component />}
    </div>
  );
};

export default DraggableItem;