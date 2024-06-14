// src/components/formElements/RadioGroup.jsx
import React from 'react';

const RadioGroup = ({ label, options, value, isRequired, error, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>
      {options.map((option, index) => (
        <div key={index} className="flex items-center mb-1">
          <input
            type="radio"
            name={label} // Ensure each radio group has a unique name
            value={option}
            className="mr-2"
            checked={value === option}
            onChange={() => onChange(option)}
            required={isRequired}
          />
          <span>{option}</span>
        </div>
      ))}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default RadioGroup;