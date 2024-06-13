// src/components/FormViewer.jsx
import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

const FormViewer = () => {
  const [formSchema, setFormSchema] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Fetch the schema from the 'outputs/form-schema.json' file
    fetch('/outputs/form-schema.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFormSchema(data);
        initializeFormValues(data.formElements);
      })
      .catch((error) => console.error('Error fetching form schema:', error));
  }, []);

  const initializeFormValues = (elements) => {
    const initialValues = {};
    elements.forEach((element) => {
      if (element.type === 'Checkbox') {
        initialValues[element.label] = [];
      } else {
        initialValues[element.label] = element.defaultValue || '';
      }
    });
    setFormValues(initialValues);
  };

  const handleInputChange = (label, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [label]: value,
    }));
    if (value) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [label]: false,
      }));
    }
  };

  const handleCheckboxChange = (label, option) => {
    setFormValues((prevValues) => {
      const currentValues = prevValues[label] || [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter((v) => v !== option)
        : [...currentValues, option];
      return { ...prevValues, [label]: newValues };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    formSchema.formElements.forEach((element) => {
      const value = formValues[element.label];
      if (element.isRequired && (!value || (Array.isArray(value) && value.length === 0))) {
        errors[element.label] = true;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } else {
        console.log('Form submitted successfully!', formValues);

        // Convert form values to a JSON string
        const formDataJson = JSON.stringify(formValues, null, 2);
    
        // Create a Blob from the JSON string
        const blob = new Blob([formDataJson], { type: 'application/json' });
    
        // Use file-saver to save the file
        saveAs(blob, 'outputs/form-data.json');
    }
  };

  const renderFormElement = (element) => {
    const error = formErrors[element.label];
    const commonProps = {
      className: `border p-2 rounded w-full ${error ? 'border-red-500' : 'border-gray-300'}`,
      value: formValues[element.label],
      onChange: (e) => handleInputChange(element.label, e.target.value),
      required: element.isRequired,
    };

    switch (element.type) {
      case 'TextBox':
        return (
          <div key={element.label} className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              {element.label}
            </label>
            <input type="text" {...commonProps} />
          </div>
        );
      case 'Radio':
        return (
          <div key={element.label} className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              {element.label}
            </label>
            {element.options.map((option, index) => (
              <div key={index} className="flex items-center mb-1">
                <input
                  type="radio"
                  name={element.label}
                  value={option}
                  className="mr-2"
                  checked={formValues[element.label] === option}
                  onChange={() => handleInputChange(element.label, option)}
                  required={element.isRequired}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        );
      case 'Dropdown':
        return (
          <div key={element.label} className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              {element.label}
            </label>
            <select {...commonProps}>
              <option value="" disabled hidden>
                Select an option
              </option>
              {element.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case 'Checkbox':
        return (
          <div key={element.label} className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              {element.label}
            </label>
            {element.options.map((option, index) => (
              <div key={index} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  value={option}
                  className="mr-2"
                  checked={formValues[element.label]?.includes(option)}
                  onChange={() => handleCheckboxChange(element.label, option)}
                  required={element.isRequired}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (!formSchema) {
    return <div>Loading form...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Form Viewer</h1>
      {showError && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded shadow-md">
          Please fill all required fields.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {formSchema.formElements.map((element) => renderFormElement(element))}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormViewer;