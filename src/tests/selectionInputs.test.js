import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { getFieldById } from './testUtils';

import FormField from '../components/form/FormField';

describe('Selection Input Components', () => {

  describe('Select Dropdown Input', () => {

    test('renders select dropdown with correct options', () => {
      const field = getFieldById('gender');
      const onChange = jest.fn();
      const props = {
        field,
        value: '',
        onChange
      };

      render(<FormField {...props} />);
      
      const selectElement = screen.getByRole('combobox');
      expect(selectElement).toBeInTheDocument();
      expect(selectElement).toHaveAttribute('id', 'gender');

      const placeholderOption = screen.getByText('Select your gender');
      expect(placeholderOption).toBeInTheDocument();
      field.options.forEach(option => {
        const optionElement = screen.getByText(option);
        expect(optionElement).toBeInTheDocument();
      });

      fireEvent.change(selectElement, { target: { value: 'Female' } });
      expect(onChange).toHaveBeenCalledWith("gender", "Female");
      expect(selectElement).toHaveValue('Female');
    });

  });

  describe('Radio Input', () => {

    test('renders radio buttons with correct options', () => {
      const field = getFieldById('employment_status');
      const props = {
        field,
        value: '',
        onChange: jest.fn()
      };

      render(<FormField {...props} />);
      
      // Check all options are rendered as radio buttons
      field.options.forEach((option, index) => {
        const radio = screen.getByRole('radio', { name: option });
        expect(radio).toBeInTheDocument();
        expect(radio).toHaveAttribute('id', `employment_status-${index}`);
        expect(radio).toHaveAttribute('name', 'employment_status');
        expect(radio).toHaveAttribute('value', option);
      });
    });

    test('radio button handles selection', () => {
      const field = getFieldById('employment_status');
      const onChange = jest.fn();
      const props = {
        field,
        value: '',
        onChange
      };

      render(<FormField {...props} />);
      
      const radioYes = screen.getByRole('radio', { name: 'Yes' });
      fireEvent.click(radioYes);
      expect(onChange).toHaveBeenCalledWith("employment_status", "Yes");
    });

    test('radio button shows selected value', () => {
      const field = getFieldById('employment_status');
      const props = {
        field,
        value: 'No',
        onChange: jest.fn()
      };

      render(<FormField {...props} />);
      
      const radioNo = screen.getByRole('radio', { name: 'No' });
      const radioYes = screen.getByRole('radio', { name: 'Yes' });
      expect(radioNo).toBeChecked();
      expect(radioYes).not.toBeChecked();
    });

  });

  describe('Checkbox Input', () => {

    test('renders checkbox with correct label', () => {
      const field = getFieldById('notifications');
      const props = {
        field,
        value: false,
        onChange: jest.fn()
      };

      render(<FormField {...props} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('id', 'notifications');
      
      const label = screen.getByText(/Receive Email Notifications/);
      expect(label).toBeInTheDocument();
    });

    test('checkbox handles toggle', () => {
      const field = getFieldById('notifications');
      const onChange = jest.fn();
      const props = {
        field,
        value: false,
        onChange
      };

      render(<FormField {...props} />);
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(onChange).toHaveBeenCalledWith("notifications", true);
      expect(checkbox).toBeChecked();
    });

  });

});