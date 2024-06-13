// src/components/layout/DropZone.jsx
import React, { useState } from 'react';
import DraggableItem from './DraggableItem';
import { useDrop } from 'react-dnd';
import { saveAs } from 'file-saver';

const DropZone = ({ items, setItems, onDrop }) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(null);
  const [isOverNewItem, setIsOverNewItem] = useState(false);
  const [errorIndices, setErrorIndices] = useState([]); // State to track items with validation errors
  const [optionErrorIndices, setOptionErrorIndices] = useState([]); // State to track option-specific errors
  const [showError, setShowError] = useState(false); // State to manage the visibility of the error message

  const [, drop] = useDrop({
    accept: ['NEW_ITEM', 'ITEM'],
    hover: (item, monitor) => {
      const hoverClientY = monitor.getClientOffset().y;

      const hoverIndex = items.findIndex((_, idx) => {
        const itemNode = document.querySelectorAll(`[data-drop-item="${idx}"]`)[0];
        if (!itemNode) return false;
        const rect = itemNode.getBoundingClientRect();
        return hoverClientY < rect.bottom;
      });

      if (monitor.getItemType() === 'NEW_ITEM') {
        setIsOverNewItem(true);
        setPlaceholderIndex(hoverIndex === -1 ? items.length : hoverIndex);
      } else if (monitor.getItemType() === 'ITEM') {
        const dragIndex = item.index;
        if (dragIndex !== hoverIndex) {
          setPlaceholderIndex(hoverIndex === -1 ? items.length : hoverIndex);
          setDraggingIndex(dragIndex);
        }
      }
    },
    drop: (item, monitor) => {
      const isNewItem = monitor.getItemType() === 'NEW_ITEM';
      const dropIndex = placeholderIndex;

      if (isNewItem) {
        const newItem = {
          type: item.type,
          label: '', // Set new items with a blank label
          id: new Date().getTime(), // Generate a unique id
          options: [''], // Initialize with one empty option
          isRequired: false, // Initialize as not required
          defaultValue: '', // Initialize with empty default value
          validationType: 'String', // Default validation type for text fields
        };
        // Insert the new item at the dropIndex position
        const updatedItems = [...items];
        updatedItems.splice(dropIndex, 0, newItem);
        setItems(updatedItems);
      } else {
        const dragIndex = item.index;
        if (dragIndex !== dropIndex) {
          moveItem(dragIndex, dropIndex);
        }
        item.index = dropIndex;
      }

      setDraggingIndex(null);
      setPlaceholderIndex(null);
      setIsOverNewItem(false);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const moveItem = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

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

  const handleOptionsChange = (index, newOptions) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, options: newOptions } : item
    );
    setItems(newItems);
  };

  const handleRequiredChange = (index, isRequired) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, isRequired } : item
    );
    setItems(newItems);
  };

  const handleDefaultChange = (index, defaultValue) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, defaultValue } : item
    );
    setItems(newItems);
  };

  const handleValidationChange = (index, validationType) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, validationType } : item
    );
    setItems(newItems);
  };

  // Validate all fields before saving
  const validateForm = () => {
    const labelErrors = [];
    const optionErrors = [];

    items.forEach((item, index) => {
      // Check if label is empty
      if (!item.label.trim()) {
        labelErrors.push(index);
      }

      // Check if item has options and validate them
      if (['Dropdown', 'Checkbox', 'Radio'].includes(item.type)) {
        const hasEmptyOptions = item.options.some(option => !option.trim());
        if (hasEmptyOptions) {
          optionErrors.push(index);
        }
      }
    });

    setErrorIndices(labelErrors);
    setOptionErrorIndices(optionErrors);

    // Combine both label and option errors to decide if the form is valid
    return labelErrors.length === 0 && optionErrors.length === 0;
  };

  const handleSaveForm = () => {
    if (validateForm()) {
      setShowError(false);
  
      // Create the schema object
      const formSchema = {
        formElements: items.map(item => {
          // Base schema for all elements
          const elementSchema = {
            type: item.type,
            label: item.label,
          };

          // Conditionally add fields based on the type of element
          if (item.isRequired !== undefined) {
            elementSchema.isRequired = item.isRequired;
          }
          
          if (['Dropdown', 'Checkbox', 'Radio'].includes(item.type)) {
            elementSchema.options = item.options || [];
          }
          
          if (item.type === 'Dropdown' && item.defaultValue !== undefined) {
            elementSchema.defaultValue = item.defaultValue;
          }

          // Include validationType for TextBox
          if (item.type === 'TextBox' && item.validationType !== undefined) {
            elementSchema.validationType = item.validationType;
          }

          return elementSchema;
        }),
      };
  
      // Convert the schema object to a JSON string
      const schemaJson = JSON.stringify(formSchema, null, 2);
  
      // Create a blob from the JSON string
      const blob = new Blob([schemaJson], { type: 'application/json' });
  
      // Use the file-saver library to save the file
      saveAs(blob, 'form-schema.json');
  
      console.log('Form saved successfully!', formSchema); // Replace this with your save logic
    } else {
      setShowError(true);
      // Hide error message after 15 seconds
      setTimeout(() => setShowError(false), 15000);
    }
  };

  return (
    <div
      className="relative flex flex-col h-full p-4 bg-gray-50 border-2 border-dashed border-blue-300 rounded-lg w-3/4 shadow-lg overflow-y-auto max-h-full"
      ref={drop}
    >
      <div className="mb-4 flex justify-end">

          <button
            onClick={handleSaveForm}
            className={`px-4 py-2 rounded-lg shadow-md transition duration-200 
                        ${items.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            disabled={items.length === 0} // Disable button if drop zone is empty
          >
            Save Form
        </button>
      </div>

      {showError && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded shadow-md transition-opacity duration-500 ease-in-out">
          All fields must be filled. Please correct the highlighted fields.
        </div>
      )}

      {items.length === 0 && !isOverNewItem ? (
        <p className="text-gray-500 text-center mt-8">Drag items here</p>
      ) : (
        items.map((item, index) => (
          <div key={item?.id || index} data-drop-item={index} className="relative">
            {index === placeholderIndex && (
              <div className="h-16 border-2 border-dashed border-blue-300 rounded my-2"></div>
            )}
            {item && item.type && (
              <DraggableItem
                index={index}
                type={item.type}
                label={item.label || ''}
                options={item.options || []} // Pass options for validation
                isRequired={item.isRequired} // Pass isRequired for validation
                defaultValue={item.defaultValue} // Pass default value for validation
                validationType={item.validationType} // Pass validation type for TextBox
                hasLabelError={errorIndices.includes(index)} // Highlight if there's a label error
                hasOptionError={optionErrorIndices.includes(index)} // Highlight if there's an option error
                onDelete={() => handleDelete(index)}
                onLabelChange={(newLabel) => handleLabelChange(index, newLabel)}
                onOptionsChange={(newOptions) => handleOptionsChange(index, newOptions)} // Handle options change
                onRequiredChange={(isRequired) => handleRequiredChange(index, isRequired)} // Handle isRequired change
                onDefaultChange={(newDefault) => handleDefaultChange(index, newDefault)} // Handle default value change
                onValidationChange={(newValidationType) => handleValidationChange(index, newValidationType)} // Handle validation type change
                moveItem={moveItem}
              />
            )}
          </div>
        ))
      )}

    {isOverNewItem && placeholderIndex === items.length && (
    <div className="h-16 border-2 border-dashed border-blue-300 rounded my-2"></div>
    )}
  </div>
);
};

export default DropZone;