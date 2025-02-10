import React, { createContext, useContext, useState, useCallback } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [visibleFields, setVisibleFields] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFieldValue = useCallback((fieldId, value) => {
    setFormData(prev => {
      const newData = { ...prev, [fieldId]: value };
      
      // find dependent fields and clear if the value doesn't match
      const dependentFields = visibleFields.filter(
        field => field.dependsOn?.field === fieldId
      );
      dependentFields.forEach(field => {
        if (field.dependsOn.value !== value) {
          delete newData[field.id];
        }
      });
      
      return newData;
    });
  }, []);

  const updateVisibleFields = useCallback((fields) => {
    setVisibleFields(fields);
  }, []);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    
    // filters out non-data fields from final submission
    const finalData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => {
        const field = visibleFields.find(f => f.id === key);
        return field && !['button', 'submit', 'reset'].includes(field.type);
      })
    );

    console.log('Form Data Submitted:', finalData);
    setIsSubmitted(true);

    // reset submission status after 3 seconds - without this it was not showing logged message in ui
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  }, [formData, visibleFields]);

  // reset form to initial state
  const resetForm = useCallback(() => {
    setFormData({});
    setIsSubmitted(false);
  }, []);

  return (
    <FormContext.Provider value={{
      formData,
      visibleFields,
      isSubmitted,
      updateFieldValue,
      updateVisibleFields,
      handleSubmit,
      resetForm
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);