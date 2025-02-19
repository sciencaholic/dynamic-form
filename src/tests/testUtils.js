import React from 'react';
import { render } from '@testing-library/react';
import { FormProvider } from '../context/FormContext';
import sampleInput from '../config/sampleInput.json';

export const getFieldById = (id) => {
  const field = sampleInput.fields.find(field => field.id === id);
  if (!field) {
    throw new Error(`Field with id "${id}" not found in sample data`);
  }
  return field;
};

export const getFieldByType = (type) => {
  return sampleInput.fields.find(field => field.type === type);
};

export const makeField = (type, overrides = {}) => {
  const sampleField = getFieldByType(type);  
  if (sampleField) {
    // matching field found
    return {
      ...sampleField,
      ...overrides
    };
  } else {
    // no matching field, fallback schema
    return {
      id: `test-${type}`,
      type,
      label: `Test ${type}`,
      required: false,
      disabled: false,
      placeholder: `Enter ${type}`,
      validation: {},
      ...overrides
    };
  }
};

// form configs for different inputs
export const sampleFields = {
  // Text inputs
  text: makeField('text'),
  email: makeField('email'),
  password: makeField('password'),
  url: makeField('url'),
  tel: makeField('tel'),
  search: makeField('search'),

  // Date/Time inputs
  date: makeField('date'),
  time: makeField('time'),
  dateTimeLocal: makeField('datetime-local'),
  month: makeField('month'),
  week: makeField('week'),

  // Selection inputs
  select: makeField('select'),
  radio: makeField('radio'),
  checkbox: makeField('checkbox'),

  // Special inputs
  file: makeField('file'),
  color: makeField('color'),
  range: makeField('range'),
  hidden: makeField('hidden'),
  textarea: makeField('textarea'),

  // Button inputs
  button: makeField('button'),
  submit: makeField('submit'),
  reset: makeField('reset'),
  image: makeField('image'),
};

// Helper to render components with FormContext
export const renderWithFormContext = (ui, { formData = {}, ...options } = {}) => {
  const Wrapper = ({ children }) => (
    <FormProvider initialData={formData}>
      {children}
    </FormProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
};

// Helper for testing dependent fields
export const getDependentFields = (parentFieldId) => {
  return sampleInput.fields.filter(field => 
    field.dependsOn?.field === parentFieldId
  );
};