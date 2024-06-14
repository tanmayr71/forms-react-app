// src/components/RequiredCheckbox.jsx
import React from 'react';
import '../../styles/RequiredCheckbox.css'; // Import the CSS file

const RequiredCheckbox = ({ isRequired, onRequiredChange }) => {
  return (
    <div className="required-checkbox-container">
      <label className="required-checkbox-label">
        <input
          type="checkbox"
          checked={isRequired}
          onChange={(e) => onRequiredChange(e.target.checked)}
          className="required-checkbox-input"
        />
        Required
      </label>
    </div>
  );
};

export default RequiredCheckbox;