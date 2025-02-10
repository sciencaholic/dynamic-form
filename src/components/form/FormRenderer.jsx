import React, { useEffect } from "react";

import { useFormContext } from "../../context/FormContext";

import FormField from "./FormField";

const FormRenderer = ({ config }) => {
  const { formData, visibleFields, isSubmitted,updateFieldValue, updateVisibleFields, handleSubmit } = useFormContext();

  // update visible fields when form data changes
  useEffect(() => {
    const getVisibleFields = () => {
      return config.fields.filter(field => {
        if (!field.dependsOn) return true;
        // check if the dependency condition is met
        const dependentValue = formData[field.dependsOn.field];
        return dependentValue === field.dependsOn.value;
      });
    };
    updateVisibleFields(getVisibleFields());
  }, [formData, config.fields, updateVisibleFields]);

  return (
    <form onSubmit={handleSubmit} className="text-left m-auto max-w-lg space-y-6">
      
      {visibleFields.map((field) => (
        <div key={field.id}>
          <FormField
            field={field}
            value={formData[field.id] || ""}
            onChange={updateFieldValue}
          />
        </div>
      ))}

      <div className="mb-4 flex flex-col items-center gap-4">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm transition-colors duration-200"
        >
          Submit Form
        </button>

        {isSubmitted && (
          <div className="py-2 text-sm text-green-600 dark:text-green-500 font-medium animate-fade-in">
            Form data has been logged to console ✓
          </div>
        )}

      </div>
    </form>
  );
};

export default FormRenderer;