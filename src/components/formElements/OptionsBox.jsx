// src/components/formElements/OptionsBox.jsx
import React from 'react';
import { FiPlus } from 'react-icons/fi'; // Feather Plus icon for a sleek look
import '../../styles/OptionsBox.css'; // Ensure you import the new styles

const OptionsBox = ({ options, onOptionChange, onAddOption, hasOptionError }) => {
  return (
    <div className="options-box-container">
      <label className="options-box-label">Options:</label>
      <div className="options-list">
        {options.map((option, index) => (
          <div key={index} className="option-item">
            <input
              type="text"
              value={option}
              onChange={(e) => onOptionChange(index, e.target.value)}
              className={`option-input ${!option.trim() && hasOptionError ? 'option-input-error' : ''}`}
              placeholder={`Option ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="add-option-button-container">
        <button
          onClick={() => onAddOption('')}
          className="add-option-button"
          aria-label="Add option"
        >
          <FiPlus className="add-option-icon" /> {/* Using FiPlus for a sleek icon */}
        </button>
      </div>
    </div>
  );
};

export default OptionsBox;