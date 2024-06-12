// src/components/TextBoxCard.jsx
import React from 'react';
import RequiredCheckbox from '../formElements/RequiredCheckbox';

const TextBoxCard = ({ isRequired, onRequiredChange, validationType, onValidationChange }) => {
  const validationOptions = [
    'String',
    'Password',
    'Number',
    'Phone Number',
    'Short Date',
    'TimeStamp',
    'Boolean',
    'Integer',
    'Decimal',
  ];

  return (
    <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm space-y-3">
      <div className="mt-2">
        <RequiredCheckbox isRequired={isRequired} onRequiredChange={onRequiredChange} />
      </div>
      <div className="space-y-1">
        <label className="block mb-1 text-sm font-medium text-gray-700">Validation Type:</label>
        <select
          value={validationType}
          onChange={onValidationChange}
          className="border border-gray-300 p-1 rounded text-sm bg-white w-full"
        >
          {validationOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TextBoxCard;