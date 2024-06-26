// src/components/cards/DropdownCard.jsx
import React from 'react';
import RequiredCheckbox from '../formElements/RequiredCheckbox';
import OptionsBox from '../formElements/OptionsBox';

const DropdownCard = ({
  label,
  options,
  onOptionsChange,
  addOption,
  hasOptionError,
  isRequired,
  onRequiredChange,
  defaultValue,
  onDefaultChange
}) => {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm space-y-4">
      {/* Required Field Checkbox */}
      <div className="mt-2">
        <RequiredCheckbox isRequired={isRequired} onRequiredChange={onRequiredChange} />
      </div>

      {/* Options Input */}
      <OptionsBox
        options={options}
        onOptionChange={onOptionsChange}
        onAddOption={addOption}
        hasOptionError={hasOptionError} // Pass error state for options
      />

      {/* Default Value Selection */}
      <div className="p-3 border border-gray-200 rounded-md">
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Select Default Value (Optional):
        </label>
        <select
          value={defaultValue}
          onChange={onDefaultChange}
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