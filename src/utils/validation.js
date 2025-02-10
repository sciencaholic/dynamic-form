export const validateInput = (field, value) => {
  
  // required field validation
  if (field.required && (value === undefined || value === null || value === "")) {
    return "This field is required";
  }

  // skip validation if field is not required and value is empty
  if (!value && !field.required) {
    return "";
  }

  // Check validation rules from field configuration
  if (field.validation) {
    const { validation } = field;

    switch (field.type) {
      case "text":
      case "textarea":
      case "password":
        if (validation.minLength && value.length < validation.minLength) {
          return validation.message || `Minimum length is ${validation.minLength} characters`; // need a fallback for message
        }
        if (validation.maxLength && value.length > validation.maxLength) {
          return validation.message || `Maximum length is ${validation.maxLength} characters`;
        }
        break;

      case "email":
        if (validation.pattern) {
          const emailRegex = new RegExp(validation.pattern);
          if (!emailRegex.test(value)) {
            return validation.message || "Please enter a valid email address";
          }
        }
        break;

      case "tel":
        if (validation.pattern) {
          const phoneRegex = new RegExp(validation.pattern);
          if (!phoneRegex.test(value)) {
            return validation.message || "Please enter a valid phone number";
          }
        }
        break;

      case "number":
      case "range":
        const numValue = Number(value);
        if (validation.min !== undefined && numValue < validation.min) {
          return validation.message || `Value must be at least ${validation.min}`;
        }
        if (validation.max !== undefined && numValue > validation.max) {
          return validation.message || `Value must be no more than ${validation.max}`;
        }
        break;

      case "date":
      case "datetime-local":
      case "time":
      case "month":
      case "week":
        if (validation.message) {
          return validation.message;
        }
        break;
    }

    if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
      return validation.message || "Invalid format";
    }
  }

  return "";
};