// src/components/TextBoxCard.jsx
import React, { useState } from 'react';

const TextBoxCard = () => {
  const [validationType, setValidationType] = useState('String');

  const handleValidationChange = (e) => {
    setValidationType(e.target.value);
  };

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
    <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm">
      <label className="block mb-2 text-sm font-medium text-gray-700">Validation Type:</label>
      <select
        value={validationType}
        onChange={handleValidationChange}
        className="border border-gray-300 p-1 rounded text-sm bg-white w-full"
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

export default TextBoxCard;