// import React from 'react';
// import { screen, fireEvent, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import FormField from '../components/form/FormField';
// import { renderWithFormContext, sampleFields, makeField } from './testUtils';

// describe('Text Input Fields', () => {
//   const defaultProps = {
//     onChange: jest.fn(),
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('Textarea Field', () => {
//     const field = sampleFields['textarea']
//     const defaultProps = {
//       onChange: jest.fn()
//     };

//     test('renders with correct rows attribute', () => {
//       renderWithFormContext(
//         <FormField field={field} value="" {...defaultProps} />
//       );
//       // The textarea should be findable by its label
//       const textarea = screen.getByTestId('textarea'); // TODO: this is the issue
//       expect(textarea.tagName.toLowerCase()).toBe('textarea');
//       expect(textarea).toHaveAttribute('rows', '4');
//     });

//     test('handles multiline input correctly', async () => {
//       renderWithFormContext(
//         <FormField field={field} value="" {...defaultProps} />
//       );
//       const textarea = screen.getByLabelText('Description');
//       // Simulate typing multiple lines with line breaks
//       const multilineText = 'First line\nSecond line\nThird line';
//       await userEvent.type(textarea, multilineText);
//       // Verify the onChange handler was called with the correct multiline value
//       expect(defaultProps.onChange).toHaveBeenLastCalledWith('test-textarea', multilineText);
//       expect(textarea).toHaveValue(multilineText);
//     });

//     test('shows validation error when required and empty', async () => {
//       renderWithFormContext(
//         <FormField field={field} value="" {...defaultProps} />
//       );
//       const textarea = screen.getByLabelText('Description');
//       fireEvent.blur(textarea);
//       await waitFor(() => {
//         expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
//       });
//     });
//   });

//   describe('Number Field', () => {
//     const field = sampleFields["number"]

//     test('renders with number type and attributes', () => {
//       renderWithFormContext(
//         <FormField field={field} value="" {...defaultProps} />
//       );
//       const input = screen.getByLabelText('Quantity');
//       expect(input).toHaveAttribute('type', 'number');
//       expect(input).toHaveAttribute('min', '0');
//       expect(input).toHaveAttribute('max', '100');
//     });

//     test('handles numeric input correctly', async () => {
//       const input = screen.getByLabelText('Quantity');
//       await userEvent.type(input, '42');
//       expect(defaultProps.onChange).toHaveBeenLastCalledWith('test-number', '42');
//       expect(input).toHaveValue(42);
//     });

//     test('validates minimum value', async () => {
//       renderWithFormContext(
//         <FormField field={field} value="3" {...defaultProps} />
//       );
//       const input = screen.getByLabelText('Quantity');
//       fireEvent.blur(input);
//       await waitFor(() => {
//         expect(screen.getByRole('alert')).toHaveTextContent('Value must be at least 5');
//       });
//     });

//     test('validates maximum value', async () => {
//       renderWithFormContext(<FormField field={field} value="15" {...defaultProps} />);
//       const input = screen.getByLabelText('Quantity');
//       fireEvent.blur(input);
//       await waitFor(() => {
//         expect(screen.getByRole('alert')).toHaveTextContent('Value must be at most 10');
//       });
//     });

//     test('handles non-numeric input', async () => {
//       const input = screen.getByLabelText('Quantity');
//       await userEvent.type(input, 'abc');
//       expect(input).toHaveValue(null);
//     });
//   });

// });