// src/components/formElements/Dropdown.jsx
import React from 'react';

const Dropdown = ({ label, options, value, isRequired, error, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <select
        className={`border p-2 rounded w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Dropdown;