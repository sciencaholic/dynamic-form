import React, { useState, useEffect } from "react";

import { validateInput } from "../../utils/validation"

const FormField = ({ field, value, onChange}) => {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  // local value till before we submit form
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const inputValue = field.type === "checkbox" ? e.target.checked : e.target.value;
    setLocalValue(inputValue);
    onChange(field.id, inputValue);
  };  

  const handleBlur = () => {
    setTouched(true);
    const validationError = validateInput(field, localValue);
    setError(validationError);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLocalValue(file);
    onChange(field.id, file);
  };

  const renderHelperText = () => {
    if (touched && error) {
      return (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500" role="alert">
          {error}
        </p>
      );
    }
    if (field.helperText) {
      return (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {field.helperText}
        </p>
      );
    }
    return null;
  };

  // from flowbite
  const baseInputClasses = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    ${touched && error ? "!border-red-500 dark:!border-red-500 focus:ring-red-500 dark:focus:ring-red-500" : ""}
    ${field.disabled ? "cursor-not-allowed bg-gray-100 dark:bg-gray-600" : ""}
  `;

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "url":
      case "tel":
      case "date":
      case "time":
      case "datetime-local":
      case "month":
      case "week":
      case "search":
        return (
          <input
            id={field.id}
            type={field.type}
            value={localValue || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required={field.required}
            disabled={field.disabled}
            placeholder={field.placeholder}
            className={baseInputClasses}
            min={field.validation?.min}
            max={field.validation?.max}
            pattern={field.validation?.pattern}
          />
        );

      case "color":
        return (
          <div className="flex items-center gap-3">
            <input
              id={field.id}
              type="color"
              value={localValue || "#000000"}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required={field.required}
              disabled={field.disabled}
              className={`h-10 w-20 p-1 rounded ${field.disabled ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
            />
            <span className={`text-sm text-gray-600 dark:text-gray-300 ${field.disabled ? "opacity-75" : ""}`}>
              {localValue || "#000000"}
            </span>
          </div>
        );

      case "textarea":
        return (
          <textarea
            id={field.id}
            value={localValue || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required={field.required}
            disabled={field.disabled}
            placeholder={field.placeholder}
            rows="4"
            className={baseInputClasses}
          />
        );

      case "select":
        return (
          <select
            id={field.id}
            value={localValue || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required={field.required}
            disabled={field.disabled}
            className={baseInputClasses}
          >
            <option value="">{field.placeholder || "Select an option"}</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className={`space-y-2 ${field.disabled ? "opacity-75" : ""}`}>
            {field.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.id}-${index}`}
                  name={field.id}
                  value={option}
                  checked={localValue === option}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required={field.required}
                  disabled={field.disabled}
                  // from flowbite
                  className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600
                    ${field.disabled ? "cursor-not-allowed" : ""}`}
                />
                <label
                  htmlFor={`${field.id}-${index}`}
                  className={`ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${field.disabled ? "cursor-not-allowed" : ""}`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center">
            <input
              id={field.id}
              type="checkbox"
              checked={!!localValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required={field.required}
              disabled={field.disabled}
              // from flowbite
              className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600
                ${field.disabled ? "cursor-not-allowed" : ""}`}
            />
            <label
              htmlFor={field.id}
              className={`ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${field.disabled ? "cursor-not-allowed" : ""}`}
            >
              {field.label} {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        );

      case "file":
        return (
          <input
            id={field.id}
            type="file"
            onChange={handleFileChange}
            onBlur={handleBlur}
            required={field.required}
            disabled={field.disabled}
            // from flowbite
            className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
              ${field.disabled ? "opacity-75 cursor-not-allowed" : ""}`}
          />
        );

      case "range":
        return (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <input
                id={field.id}
                type="range"
                min={field.validation?.min || 0}
                max={field.validation?.max || 100}
                value={localValue || field.validation?.min || 0}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required={field.required}
                disabled={field.disabled}
                // from flowbite
                className={`w-full h-2 bg-gray-200 rounded-lg appearance-none dark:bg-gray-700 ${field.disabled ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
              />
              <span className={`text-sm text-gray-600 dark:text-gray-300 min-w-[2rem] ${field.disabled ? "opacity-75" : ""}`}>
                {localValue || field.validation?.min || 0}
              </span>
            </div>
            <div className={`flex justify-between text-xs text-gray-500 ${field.disabled ? "opacity-75" : ""}`}>
              <span>{field.validation?.min || 0}</span>
              <span>{field.validation?.max || 100}</span>
            </div>
          </div>
        );

      case "button":
      case "submit":
      case "reset":
        return (
          <button
            id={field.id}
            type={field.type}
            // onClick={field.onClick} // TODO: future feature addition
            disabled={field.disabled}
            // from flowbite
            className={`text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none
              ${field.disabled ? "opacity-75 cursor-not-allowed bg-blue-700" : "hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}`}
          >
            {field.label}
          </button>
        );

      case "image":
        return (
          <input
            id={field.id}
            type="image"
            src={field.src}
            alt={field.alt}
            disabled={field.disabled}
            className={`cursor-pointer hover:opacity-80 transition-opacity ${field.disabled ? "opacity-75 cursor-not-allowed" : ""}`}
            // onClick={field.onClick} // TODO: future feature addition
          />
        );

      case "hidden":
        return (
          <input
            id={field.id}
            type="hidden"
            name={field.id}
            value={field.value || ""}
          />
        );

      default:
        return (
          <p className="text-red-500">Unsupported input type: {field.type}</p>
        );
    }
  };

  if (field.type === "hidden") {
    return renderField();
  }

  return (
    <div className="mb-6">
      {field.type !== "checkbox" && (
        <label
          htmlFor={field.id}
          className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${field.disabled ? "opacity-75" : ""}`}
        >
          {field.label} {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderField()}
      {renderHelperText()}
    </div>
  );
};

export default FormField;
