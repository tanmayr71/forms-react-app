// src/components/RequiredCheckbox.jsx
import React from 'react';

const RequiredCheckbox = ({ isRequired, onRequiredChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">
        <input
          type="checkbox"
          checked={isRequired}
          onChange={(e) => onRequiredChange(e.target.checked)}
          className="mr-2"
        />
        Required
      </label>
    </div>
  );
};

export default RequiredCheckbox;