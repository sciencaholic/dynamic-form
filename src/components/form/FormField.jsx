import React, { useState, useEffect } from "react";

import { validateInput } from "../../utils/validation"

import BasicInput from "../elements/BasicInput";
import ColorInput from "../elements/ColorInput";
import TextareaInput from "../elements/TextareaInput";
import SelectDropdownInput from "../elements/SelectDropdownInput";
import RadioInput from "../elements/RadioInput";
import CheckboxInput from "../elements/CheckboxInput";
import RangeInput from "../elements/RangeInput";
import FileInput from "../elements/FileInput";
import ImageInput from "../elements/ImageInput";
import ButtonInput from "../elements/ButtonInput";

const FormField = ({ field, value, onChange}) => {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  // local value until we submit form
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const inputValue = field.type === "checkbox" ? e.target.checked : e.target.value;
    setLocalValue(inputValue);
    onChange(field.id, inputValue);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLocalValue(file);
    onChange(field.id, file);
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = validateInput(field, localValue);
    setError(validationError);
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
          <BasicInput 
            id={field.id}
            type={field.type}
            required={field.required}
            disabled={field.disabled}
            placeholder={field.placeholder}
            classes={baseInputClasses}
            validation={field.validation}
            value={localValue || ""}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
          />
        );

      case "select":
        return (
          <SelectDropdownInput
            id={field.id}
            options={field.options}
            required={field.required}
            disabled={field.disabled}
            placeholder={field.placeholder}
            classes={baseInputClasses}
            value={localValue}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
          />
        );

      case "radio":
        return (
          <RadioInput
            id={field.id}
            options={field.options}
            required={field.required}
            disabled={field.disabled}
            value={localValue}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
          />
        );

      case "checkbox":
        return (
          <CheckboxInput
            id={field.id}
            label={field.label}
            required={field.required}
            disabled={field.disabled}
            value={localValue}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
          />
        );

      case "color":
        return (
          <ColorInput
            id={field.id}
            required={field.required}
            disabled={field.disabled}
            value={localValue}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
          />
        );

      case "textarea":
        return (
          <TextareaInput
            id={field.id}
            required={field.required}
            disabled={field.disabled}
            placeholder={field.placeholder}
            classes={baseInputClasses}
            value={localValue}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
          />
        );

      case "range":
        return (
          <RangeInput
            id={field.id}
            required={field.required}
            disabled={field.disabled}
            value={localValue}
            validation={field.validation}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
          />
        );

      case "file":
        return (
          <FileInput
            id={field.id}
            required={field.required}
            disabled={field.disabled}
            // validation // TODO: future feature addition
            handleInputChange={handleFileChange}
            handleBlur={handleBlur}
          />
        );

      case "image":
        return (
          <ImageInput 
            id={field.id}
            required={field.required}
            disabled={field.disabled}
            src={field.src}
            alt={field.alt}
            // onClick={onClick} // TODO: future feature addition
          />
        );

      case "button":
      case "submit":
      case "reset":
        return (
          <ButtonInput
            id={field.id}
            type={field.type}
            label={field.label}
            disabled={field.disabled}
            // onClick={onClick} // TODO: future feature addition
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
