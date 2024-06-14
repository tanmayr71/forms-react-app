// src/utils/validation.js

// Define the validation options for consistency
export const validationOptions = [
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

// Utility function to validate input based on type
export const validateInput = (value, validationType) => {
    switch (validationType) {
      case 'String':
        if (typeof value === 'string' && value.trim() !== '') {
          return { isValid: true };
        }
        return { isValid: false, message: 'This field must be a non-empty string.' };
  
      case 'Password':
        // Password must have at least one uppercase, one lowercase, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (passwordRegex.test(value)) {
          return { isValid: true };
        }
        return {
          isValid: false,
          message:
            'Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.',
        };
  
      case 'Number':
        if (!isNaN(value)) {
          return { isValid: true };
        }
        return { isValid: false, message: 'This field must be a number.' };
  
      case 'Phone Number':
        // Using a simple regex for international phone numbers
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (phoneRegex.test(value)) {
          return { isValid: true };
        }
        return { isValid: false, message: 'Please enter a valid phone number (e.g., +123456789).' };
  
      case 'Short Date':
        // MM/DD/YYYY format validation
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (dateRegex.test(value)) {
          return { isValid: true };
        }
        return { isValid: false, message: 'Please enter a date in MM/DD/YYYY format.' };
  
      case 'TimeStamp':
        if (!isNaN(Date.parse(value))) {
          return { isValid: true };
        }
        return { isValid: false, message: 'Please enter a valid timestamp.' };
  
      case 'Boolean':
        if (value === 'true' || value === 'false') {
          return { isValid: true };
        }
        return { isValid: false, message: 'This field must be true or false.' };
  
      case 'Integer':
        if (Number.isInteger(Number(value))) {
          return { isValid: true };
        }
        return { isValid: false, message: 'This field must be an integer.' };
  
      case 'Decimal':
        if (!isNaN(value) && value.toString().indexOf('.') !== -1) {
          return { isValid: true };
        }
        return { isValid: false, message: 'This field must be a decimal number.' };
  
      default:
        return { isValid: true }; // Default to valid for unrecognized types
    }
  };