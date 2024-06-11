// src/components/RadioButtonCard.jsx
import React, { useState } from 'react';
import ValidationBox from './ValidationBox';
import OptionsBox from './OptionsBox';

const RadioButtonCard = () => {
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
      {/* Bordered box for ValidationBox */}
      <div className="p-3 border border-gray-200 rounded-md">
        <ValidationBox validationType={validationType} onValidationChange={handleValidationChange} />
      </div>
      
      {/* Bordered box for OptionsBox */}
      <div className="p-3 border border-gray-200 rounded-md">
        <OptionsBox options={options} onOptionChange={updateOption} onAddOption={addOption} />
      </div>
    </div>
  );
};

export default RadioButtonCard;