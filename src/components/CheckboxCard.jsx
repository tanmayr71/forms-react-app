// src/components/CheckboxCard.jsx
import React, { useState } from 'react';
import ValidationBox from './ValidationBox';
import OptionsBox from './OptionsBox';

const CheckboxCard = () => {
  const [validationType, setValidationType] = useState('Optional');
  const [options, setOptions] = useState(['Option 1']);

  const handleValidationChange = (e) => {
    setValidationType(e.target.value);
  };

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm space-y-4">
      {/* Use ValidationBox for validation type selection */}
      <div className="p-3 border border-gray-200 rounded-md">
        <ValidationBox validationType={validationType} onValidationChange={handleValidationChange} />
      </div>
      
      {/* Use OptionsBox for managing options */}
      <div className="p-3 border border-gray-200 rounded-md">
        <OptionsBox options={options} onOptionChange={updateOption} onAddOption={addOption} />
      </div>
    </div>
  );
};

export default CheckboxCard;