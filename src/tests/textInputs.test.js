import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormField from '../components/form/FormField';
import { renderWithFormContext, sampleFields, makeField } from './testUtils';import { validateInput } from '../utils/validation';


describe('Text Input Fields', () => {
  const defaultProps = {
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Common Text Input Behavior', () => {
    
    const textTypes = ['text', 'email', 'url', 'tel', 'search']; // TODO: password
    const getInput = (type) => {
      switch (type) {
        case 'password':
          return screen.getByLabelText(sampleFields[type].label);
        case 'search':
          return screen.getByRole('searchbox');
        default:
          return screen.getByRole('textbox');
      }
    };

    textTypes.forEach(type => {

      // -----------------
      describe(`${type} input`, () => {
        test('renders with correct type and attributes', () => {
          const field = sampleFields[type];
          renderWithFormContext(<FormField field={field} value="" {...defaultProps} />);
          const input = getInput(type);
          expect(input).toHaveAttribute('type', type);
          expect(input).toHaveAttribute('id', field.id);
          const label = screen.getByText(field.label);
          expect(label).toBeInTheDocument();
        });

        test('handles user input correctly', async () => {
          const field = sampleFields[type];
          renderWithFormContext(<FormField field={field} value="" {...defaultProps} />);
          const input = getInput(type);
          const testValue = 'test input';
          await userEvent.type(input, testValue);
          expect(defaultProps.onChange).toHaveBeenCalledWith(field.id, testValue);
        });

        test('displays validation error on blur when required', async () => {
          const field = makeField(type, { required: true });
          renderWithFormContext(<FormField field={field} value="" {...defaultProps} />);
          const input = getInput(type);
          fireEvent.blur(input);
          await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
          });
        });
      });

      // -----------------
    });
  });

  describe('Specific Input Type Validation', () => {
    test('email validates format', async () => {
      const field = makeField('email', {
        validation: {
          pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
          message: 'Invalid email format'
        }
      });
      renderWithFormContext(<FormField field={field} value="invalid-email" {...defaultProps} />);
      const input = screen.getByRole('textbox');
      fireEvent.blur(input);
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Invalid email format');
      });
    });

    test('url validates format', async () => {
      const field = makeField('url', {
        validation: {
          pattern: 'https?://.+',
          message: 'Must be a valid URL'
        }
      });
      renderWithFormContext(<FormField field={field} value="invalid-url" {...defaultProps} />);
      const input = screen.getByRole('textbox');
      fireEvent.blur(input);
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Must be a valid URL');
      });
    });

    test('tel validates format', async () => {
      const field = makeField('tel', {
        validation: {
          pattern: '^\\+?[1-9]\\d{1,14}$',
          message: 'Invalid phone number'
        }
      });
      renderWithFormContext(<FormField field={field} value="invalid-phone" {...defaultProps} />);
      const input = screen.getByRole('textbox');
      fireEvent.blur(input);
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Invalid phone number');
      });
    });

  });

  describe('Input Length Validation', () => {
    
    // -----------------
    test('enforces minLength validation', async () => {
      const field = makeField('text', {
        validation: {
          minLength: 5,
          message: 'Minimum length is 5 characters'
        }
      });
      renderWithFormContext(<FormField field={field} value="abc" {...defaultProps} />);
      const input = screen.getByRole('textbox');
      fireEvent.blur(input);
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Minimum length is 5 characters');
      });
    });

    test('enforces maxLength validation', async () => {
      const field = makeField('text', {
        validation: {
          maxLength: 10,
          message: 'Maximum length is 10 characters'
        }
      });
      renderWithFormContext(<FormField field={field} value="this is too long" {...defaultProps} />);
      const input = screen.getByRole('textbox');
      fireEvent.blur(input);
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Maximum length is 10 characters');
      });
    });

    // -----------------
  });

  describe('Helper Text and Error States', () => {
    
    // -----------------
    test('displays helper text when provided', () => {
      const field = makeField('text', {
        helperText: 'This is a helpful message'
      });
      renderWithFormContext(<FormField field={field} value="" {...defaultProps} />);
      expect(screen.getByText('This is a helpful message')).toBeInTheDocument();
    });

    test('switches from helper text to error message on validation failure', async () => {
      const field = makeField('text', {
        helperText: 'This is a helpful message',
        required: true
      });

      renderWithFormContext(<FormField field={field} value="" {...defaultProps} />);

      expect(screen.getByText('This is a helpful message')).toBeInTheDocument();

      const input = screen.getByRole('textbox');
      fireEvent.blur(input);

      await waitFor(() => {
        expect(screen.queryByText('This is a helpful message')).not.toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
      });
    });

    // -----------------
  });

  // TODO: disabled option test
});