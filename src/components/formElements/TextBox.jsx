// src/components/formElements/TextBox.jsx
import React from 'react';

const TextBox = ({ label, value, isRequired, validationType, error, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type="text"
        className={`border p-2 rounded w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextBox;