// By mocking the validation function, we can ensure that any test failures are specifically related to 
// the component's behavior rather than potential issues in the validation logic. 
// The validation logic should be tested separately in its own test file.

export const validateInput = jest.fn((field, value) => {
  if (field.required && !value) {
    return 'This field is required';
  }

  if (field.validation) {
    const { minLength, maxLength, pattern, min, max, message } = field.validation;

    if (minLength && value.length < minLength) {
      return message || `Minimum length is ${minLength} characters`;
    }

    if (maxLength && value.length > maxLength) {
      return message || `Maximum length is ${maxLength} characters`;
    }

    if (pattern && !new RegExp(pattern).test(value)) {
      return message || 'Invalid format';
    }

    if (field.type === 'number' || field.type === 'range') {
      const numValue = Number(value);
      if (min !== undefined && numValue < min) {
        return message || `Value must be at least ${min}`;
      }
      if (max !== undefined && numValue > max) {
        return message || `Value must be at most ${max}`;
      }
    }
  }

  return '';
});