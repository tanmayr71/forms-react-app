// src/components/layout/DraggableItem.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { MdDelete } from 'react-icons/md';
import TextBoxCard from '../cards/TextBoxCard';
import RadioButtonCard from '../cards/RadioButtonCard';
import CheckboxCard from '../cards/CheckboxCard';
import DropdownCard from '../cards/DropdownCard';

const DraggableItem = ({
  type,
  label,
  options = [],
  hasLabelError,
  hasOptionError,
  onDelete,
  onLabelChange,
  onOptionsChange,
  index,
  moveItem,
}) => {
  const [editableLabel, setEditableLabel] = useState(label || '');
  const [editableOptions, setEditableOptions] = useState(options);

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setEditableLabel(newLabel);
    onLabelChange(newLabel);
  };

  const handleOptionChange = (optionIndex, newOption) => {
    const updatedOptions = editableOptions.map((option, idx) =>
      idx === optionIndex ? newOption : option
    );
    setEditableOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  const addOption = () => {
    const updatedOptions = [...editableOptions, ''];
    setEditableOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  useEffect(() => {
    setEditableLabel(label);
    setEditableOptions(options);
  }, [label, options]);

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
    <div
      ref={ref}
      className={`relative m-2 p-4 border rounded bg-white shadow-sm ${
        isDragging ? 'opacity-80 bg-blue-100' : 'opacity-100'
      } ${hasLabelError ? 'border-red-500' : 'border-gray-300'}`} // Highlight if there's a label error
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex-grow">
          <input
            type="text"
            value={editableLabel}
            onChange={handleLabelChange}
            className={`text-sm font-medium text-gray-700 border p-2 rounded w-full ${
              hasLabelError ? 'border-red-500' : ''
            }`} // Highlight if there's a label error
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
      {Component && (
        <Component
          label={editableLabel}
          options={editableOptions}
          onOptionsChange={handleOptionChange}
          addOption={addOption}
          hasOptionError={hasOptionError} // Pass error state for options
        />
      )}
    </div>
  );
};

export default DraggableItem;