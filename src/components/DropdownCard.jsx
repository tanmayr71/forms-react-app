// src/components/DropdownCard.jsx
import React, { useState } from 'react';
import ValidationBox from './ValidationBox';
import OptionsBox from './OptionsBox';

const DropdownCard = () => {
  const [validationType, setValidationType] = useState('Optional');
  const [options, setOptions] = useState(['Option 1']);
  const [defaultValue, setDefaultValue] = useState('');

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

  const handleDefaultChange = (e) => {
    setDefaultValue(e.target.value);
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

      {/* Section for Default Value Selection */}
      <div className="p-3 border border-gray-200 rounded-md">
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Select Default Value (Optional):
        </label>
        <select
          value={defaultValue}
          onChange={handleDefaultChange}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">None</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropdownCard;