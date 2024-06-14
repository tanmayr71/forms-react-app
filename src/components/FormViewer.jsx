// src/components/FormViewer.jsx
import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { validateInput } from '../utils/validation';
import TextBox from './formElements/TextBox';
import RadioGroup from './formElements/RadioGroup';
import Dropdown from './formElements/Dropdown';
import CheckboxGroup from './formElements/CheckboxGroup';
import '../styles/FormViewer.css'; // Import the CSS for styling

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

  const handleInputChange = (label, value, validationType) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [label]: value,
    }));

    // Validate the input based on the validation type
    const { isValid, message } = validateInput(value, validationType);

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [label]: !isValid ? message : false,
    }));
  };

  const handleCheckboxChange = (label, option) => {
    setFormValues((prevValues) => {
      const currentValues = prevValues[label] || [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter((v) => v !== option)
        : [...currentValues, option];
      
      return { ...prevValues, [label]: newValues };
    });

    // Perform validation immediately after updating the state
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [label]: false, // Clear any previous error since we rely on the '*' indication now
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    formSchema.formElements.forEach((element) => {
      const value = formValues[element.label];
      const { isValid } = validateInput(value, element.validationType);

      if (element.isRequired && (!value || (Array.isArray(value) && value.length === 0))) {
        errors[element.label] = true; // Simplified to a boolean for showing general errors
      } else if (!isValid) {
        const { message } = validateInput(value, element.validationType);
        errors[element.label] = message;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShowError(true);
      setTimeout(() => setShowError(false), 15000);
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

  if (!formSchema) {
    return <div>Loading form...</div>;
  }

  return (
    <div className="form-viewer-container">
      <h1 className="form-viewer-title">Form Viewer</h1>
      <p className="form-viewer-instruction">
        Fields marked with <span className="required-asterisk">*</span> are required.
      </p>
      <form onSubmit={handleSubmit} className="form-viewer-form">
        {formSchema.formElements.map((element) => {
          const labelWithAsterisk = element.isRequired ? `${element.label} *` : element.label;
          switch (element.type) {
            case 'TextBox':
              return (
                <TextBox
                  key={element.label}
                  label={labelWithAsterisk}
                  value={formValues[element.label] || ''}
                  isRequired={element.isRequired}
                  validationType={element.validationType}
                  error={formErrors[element.label]}
                  onChange={(value) => handleInputChange(element.label, value, element.validationType)}
                />
              );
            case 'Radio':
              return (
                <RadioGroup
                  key={element.label}
                  label={labelWithAsterisk}
                  options={element.options}
                  value={formValues[element.label] || ''}
                  isRequired={element.isRequired}
                  error={formErrors[element.label]}
                  onChange={(value) => handleInputChange(element.label, value)}
                />
              );
            case 'Dropdown':
              return (
                <Dropdown
                  key={element.label}
                  label={labelWithAsterisk}
                  options={element.options}
                  value={formValues[element.label] || ''}
                  isRequired={element.isRequired}
                  error={formErrors[element.label]}
                  onChange={(value) => handleInputChange(element.label, value)}
                />
              );
            case 'Checkbox':
              return (
                <CheckboxGroup
                  key={element.label}
                  label={labelWithAsterisk}
                  options={element.options}
                  values={formValues[element.label] || []}
                  isRequired={element.isRequired}
                  error={formErrors[element.label]}
                  onChange={(option) => handleCheckboxChange(element.label, option)}
                />
              );
            default:
              return null;
          }
        })}
        {showError && (
          <div className="form-viewer-error">
            Please fill all required fields and correct the highlighted errors.
          </div>
        )}
        <button
          type="submit"
          className="form-viewer-submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormViewer;