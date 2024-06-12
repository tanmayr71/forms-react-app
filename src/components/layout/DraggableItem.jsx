import React, { useRef, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaRegTimesCircle } from 'react-icons/fa'; // Import macOS-like close icon
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
  isRequired,
  onRequiredChange,
  defaultValue,
  onDefaultChange,
  validationType,
  onValidationChange,
}) => {
  const [editableLabel, setEditableLabel] = useState(label || '');
  const [editableOptions, setEditableOptions] = useState(options);
  const [isRequiredState, setIsRequiredState] = useState(isRequired || false);
  const [defaultOption, setDefaultOption] = useState(defaultValue || '');
  const [validationTypeState, setValidationTypeState] = useState(validationType || '');

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

  const handleRequiredChange = (required) => {
    setIsRequiredState(required);
    onRequiredChange(required);
  };

  const handleDefaultChange = (e) => {
    setDefaultOption(e.target.value);
    onDefaultChange(e.target.value);
  };

  const handleValidationChange = (e) => {
    setValidationTypeState(e.target.value);
    onValidationChange(e.target.value);
  };

  useEffect(() => {
    setEditableLabel(label);
    setEditableOptions(options);
    setIsRequiredState(isRequired);
    setDefaultOption(defaultValue);
    setValidationTypeState(validationType);
  }, [label, options, isRequired, defaultValue, validationType]);

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
      {/* New Row for Delete Button */}
      <div className="flex justify-end items-center mb-1">
        <button
          onClick={onDelete}
          className="text-gray-500 hover:text-red-500 transition-all duration-200 ease-in-out"
          aria-label="Delete"
          style={{ width: '24px', height: '24px', padding: '4px' }} // Adjust size, padding
        >
          <FaRegTimesCircle className="h-full w-full" />
        </button>
      </div>
      <div className="flex items-center mb-2">
        {/* Order number display */}
        <div className="mr-2 text-lg font-semibold text-gray-700 flex-shrink-0 flex items-center justify-center" style={{ minWidth: '24px', height: '40px' }}>
          {index + 1}
        </div>
        <div className="flex-grow">
          <input
            type="text"
            value={editableLabel}
            onChange={handleLabelChange}
            className={`text-sm font-medium text-gray-700 border p-2 rounded w-full ${
              hasLabelError ? 'border-red-500' : ''
            }`} // Highlight if there's a label error
            placeholder="Enter heading here"
            style={{ height: '40px' }} // Match the height of number and delete button
          />
          <div className="text-xs text-gray-500 mt-1">Type: {type}</div>
        </div>
      </div>
      {Component && (
        <Component
          label={editableLabel}
          options={editableOptions}
          isRequired={isRequiredState} // Pass down the isRequired state
          onRequiredChange={handleRequiredChange} // Pass the handler for isRequired change
          defaultValue={defaultOption} // Pass down the defaultValue state
          onDefaultChange={handleDefaultChange} // Pass the handler for defaultValue change
          validationType={validationTypeState} // Pass down the validationType state
          onValidationChange={handleValidationChange} // Pass the handler for validationType change
          onOptionsChange={handleOptionChange}
          addOption={addOption}
          hasOptionError={hasOptionError}
        />
      )}
    </div>
  );
};

export default DraggableItem;