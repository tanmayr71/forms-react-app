// src/components/cards/CheckboxCard.jsx
import React from 'react';
import RequiredCheckbox from '../formElements/RequiredCheckbox';
import OptionsBox from '../formElements/OptionsBox';

const CheckboxCard = ({ label, options, onOptionsChange, addOption, hasOptionError, isRequired, onRequiredChange }) => {
  return (
    <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm space-y-3">
      <div className="mt-2">
        <RequiredCheckbox isRequired={isRequired} onRequiredChange={onRequiredChange} />
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

export default CheckboxCard;