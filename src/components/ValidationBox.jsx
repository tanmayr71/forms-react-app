// src/components/ValidationBox.jsx
import React from 'react';

const ValidationBox = ({ validationType, onValidationChange }) => {
  const validationOptions = ['Optional', 'Required'];

  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">Validation Type:</label>
      <select
        value={validationType}
        onChange={onValidationChange}
        className="border border-gray-300 p-2 rounded text-sm bg-white w-full mb-4"
      >
        {validationOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ValidationBox;