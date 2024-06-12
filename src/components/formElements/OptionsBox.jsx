// src/components/formElements/OptionsBox.jsx
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const OptionsBox = ({ options, onOptionChange, onAddOption, hasOptionError }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">Options:</label>
      <div className="space-y-2 mb-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={option}
              onChange={(e) => onOptionChange(index, e.target.value)}
              className={`border p-2 rounded w-full text-sm ${
                !option.trim() && hasOptionError ? 'border-red-500' : 'border-gray-300'
              }`} // Highlight if the option is empty and there is an error
              placeholder={`Option ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => onAddOption('')}
          className="text-blue-500 hover:text-blue-600 transition-colors duration-200 ease-in-out"
          aria-label="Add option"
        >
          <FaPlusCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default OptionsBox;