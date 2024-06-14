// src/components/formElements/CheckboxGroup.jsx
import React from 'react';

const CheckboxGroup = ({ label, options, values, error, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label} {/* The * is added in FormViewer if needed */}
      </label>
      {options.map((option, index) => (
        <div key={index} className="flex items-center mb-1">
          <input
            type="checkbox"
            value={option}
            className="mr-2"
            checked={values.includes(option)}
            onChange={() => onChange(option)} // Simplified to pass only the option
          />
          <span>{option}</span>
        </div>
      ))}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;