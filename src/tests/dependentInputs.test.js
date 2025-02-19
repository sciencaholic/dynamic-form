import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { getFieldById, getDependentFields } from './testUtils';

import FormRenderer from '../components/form/FormRenderer';
import { FormProvider } from '../context/FormContext';

// mock form configuration
const mockConfig = {
  fields: [
    getFieldById('employment_status'),
    getFieldById('job_title'),
    getFieldById('company_name')
  ]
};

// helper to render formrenderer with formcontext
const renderWithFormContext = (ui, initialData = {}) => {
  return render(
    <FormProvider initialData={initialData}>
      {ui}
    </FormProvider>
  );
};

describe('Dependent Fields Behavior', () => {
  
  test('dependent fields are initially hidden', () => {
    renderWithFormContext(<FormRenderer config={mockConfig} />);
    
    // main field should be visible
    const employmentLabel = screen.getByText(/Are you employed?/i);
    expect(employmentLabel).toBeInTheDocument();
    
    // dependent fields should not be visible
    const jobTitleLabel = screen.queryByText(/Job Title/i);
    const companyNameLabel = screen.queryByText(/Company Name/i);
    expect(jobTitleLabel).not.toBeInTheDocument();
    expect(companyNameLabel).not.toBeInTheDocument();
  });
  
  test('dependent fields appear when condition is met', async () => {
    renderWithFormContext(<FormRenderer config={mockConfig} />);
    
    const yesRadio = screen.getByRole('radio', { name: 'Yes' });
    fireEvent.click(yesRadio);
    
    // wait for dependent fields to appear
    await waitFor(() => {
      const jobTitleLabel = screen.getByText(/Job Title/i);
      const companyNameLabel = screen.getByText(/Company Name/i);
      expect(jobTitleLabel).toBeInTheDocument();
      expect(companyNameLabel).toBeInTheDocument();
    });
  });
  
  test('dependent fields disappear when condition is no longer met', async () => {
    renderWithFormContext(<FormRenderer config={mockConfig} />);
    
    // first select "yes"
    const yesRadio = screen.getByRole('radio', { name: 'Yes' });
    fireEvent.click(yesRadio);
    await waitFor(() => {
      const jobTitleLabel = screen.getByText(/Job Title/i);
      expect(jobTitleLabel).toBeInTheDocument();
    });
    
    // then select "no"
    const noRadio = screen.getByRole('radio', { name: 'No' });
    fireEvent.click(noRadio);
    await waitFor(() => {
      const jobTitleLabel = screen.queryByText(/Job Title/i);
      const companyNameLabel = screen.queryByText(/Company Name/i);
      expect(jobTitleLabel).not.toBeInTheDocument();
      expect(companyNameLabel).not.toBeInTheDocument();
    });
  });
  
  test('dependent field values are cleared when condition is no longer met', async () => {
    const consoleSpy = jest.spyOn(console, 'log'); // to capture form submissions
    renderWithFormContext(<FormRenderer config={mockConfig} />);
    
    // first select "yes"
    const yesRadio = screen.getByRole('radio', { name: 'Yes' });
    fireEvent.click(yesRadio);
    // fill in dependent fields
    await waitFor(() => {
      const jobTitleInput = screen.getByPlaceholderText('Senior Software Engineer');
      const companyNameInput = screen.getByPlaceholderText('Acme Inc.');
      
      fireEvent.change(jobTitleInput, { target: { value: 'Developer' } });
      fireEvent.change(companyNameInput, { target: { value: 'Tech Corp' } });
    });
    
    // then select "no"
    const noRadio = screen.getByRole('radio', { name: 'No' });
    fireEvent.click(noRadio);
    
    // submit the form to check what values are included
    const submitButton = screen.getByText('Submit Form');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
      const lastCall = consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1];
      const submittedData = lastCall[1];
      expect(submittedData).toHaveProperty('employment_status', 'No');
      expect(submittedData).not.toHaveProperty('job_title');
      expect(submittedData).not.toHaveProperty('company_name');
    });
    
    consoleSpy.mockRestore();
  });

});