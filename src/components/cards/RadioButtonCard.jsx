// src/components/cards/RadioButtonCard.jsx
import React, { useState } from 'react';
import RequiredCheckbox from '../formElements/RequiredCheckbox';
import OptionsBox from '../formElements/OptionsBox';

const RadioButtonCard = ({ label, options, onOptionsChange, addOption, hasOptionError }) => {
  const [isRequired, setIsRequired] = useState(false);

  const handleRequiredChange = (required) => {
    setIsRequired(required);
  };

  return (
    <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm space-y-3">
      <div className="mt-2">
        <RequiredCheckbox isRequired={isRequired} onRequiredChange={handleRequiredChange} />
      </div>
      <OptionsBox
        options={options}
        onOptionChange={onOptionsChange}
        onAddOption={addOption}
        hasOptionError={hasOptionError} // Pass error state for options
      />
    </div>
  );
};

export default RadioButtonCard;