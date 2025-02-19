import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { getFieldById } from './testUtils';

import FormField from '../components/form/FormField';

describe('Special Input Components', () => {

  describe('Color Input', () => {

    test('renders color input with default value', () => {
      const field = getFieldById('favorite_color');
      const props = {
        field,
        value: '',
        onChange: jest.fn()
      };

      const { container } = render(<FormField {...props} />);
      
      // Color inputs don't have a standard ARIA role, so use querySelector instead
      const colorInput = container.querySelector('input[type="color"]');
      expect(colorInput).toBeInTheDocument();
      expect(colorInput).toHaveAttribute('id', 'favorite_color');
      expect(colorInput).toHaveValue('#000000');
      const colorValue = screen.getByText('#000000');
      expect(colorValue).toBeInTheDocument();
    });

    test('color input handles value changes', () => {
      const field = getFieldById('favorite_color');
      const onChange = jest.fn();
      const props = {
        field,
        value: '#000000',
        onChange
      };

      const { container } = render(<FormField {...props} />);
      
      const colorInput = container.querySelector('input[type="color"]');
      fireEvent.change(colorInput, { target: { value: '#FF5733' } });
      expect(onChange).toHaveBeenCalledWith("favorite_color", "#ff5733");
    });
    
  });

  describe('Textarea Input', () => {

    test('renders textarea with placeholder', () => {
      const field = getFieldById('comments');
      const props = {
        field,
        value: '',
        onChange: jest.fn()
      };

      render(<FormField {...props} />);
      
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('id', 'comments');
      expect(textarea).toHaveAttribute('placeholder', 'Enter any additional comments');
      expect(textarea).toHaveAttribute('rows', '4');
    });

    test('textarea handles value changes', () => {
      const field = getFieldById('comments');
      const onChange = jest.fn();
      const props = {
        field,
        value: '',
        onChange
      };

      render(<FormField {...props} />);
      
      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'This is a comment' } });
      expect(onChange).toHaveBeenCalledWith("comments", "This is a comment");
    });

  });

  describe('Range Input', () => {

    test('renders range input with min/max values', () => {
      const field = getFieldById('rating');
      const props = {
        field,
        value: 5,
        onChange: jest.fn()
      };

      render(<FormField {...props} />);
      
      const rangeInput = screen.getByRole('slider');
      expect(rangeInput).toBeInTheDocument();
      expect(rangeInput).toHaveAttribute('id', 'rating');
      expect(rangeInput).toHaveAttribute('min', '1');
      expect(rangeInput).toHaveAttribute('max', '10');
      expect(rangeInput).toHaveValue('5');
      
      const minLabel = screen.getByText('1');
      const maxLabel = screen.getByText('10');
      expect(minLabel).toBeInTheDocument();
      expect(maxLabel).toBeInTheDocument();

      const valueLabel = screen.getByText('5', { selector: 'span.text-sm' });
      expect(valueLabel).toBeInTheDocument();
    });

    test('range input handles value changes', () => {
      const field = getFieldById('rating');
      const onChange = jest.fn();
      const props = {
        field,
        value: 5,
        onChange
      };

      render(<FormField {...props} />);
      
      const rangeInput = screen.getByRole('slider');
      fireEvent.change(rangeInput, { target: { value: 8 } });
      expect(onChange).toHaveBeenCalledWith("rating", "8"); // string conversion happens on change
    });

    test('range input uses validation props for min/max', () => {
      const field = getFieldById('rating');
      const props = {
        field,
        value: 3,
        onChange: jest.fn()
      };

      render(<FormField {...props} />);
      
      const rangeInput = screen.getByRole('slider');
      expect(rangeInput).toHaveAttribute('min', '1');
      expect(rangeInput).toHaveAttribute('max', '10');
      
      const minLabel = screen.getByText('1');
      const maxLabel = screen.getByText('10');
      expect(minLabel).toBeInTheDocument();
      expect(maxLabel).toBeInTheDocument();
    });

  });

  describe('File Input', () => {
    
    test('renders file input correctly', () => {
      const field = getFieldById('profile_picture');
      const props = {
        field,
        value: null,
        onChange: jest.fn()
      };

      render(<FormField {...props} />);
      
      const fileInput = screen.getByLabelText(/Upload Profile Picture/i) || document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute('id', 'profile_picture');
      expect(fileInput).toHaveAttribute('type', 'file');

      const helperText = screen.getByText(field.helperText);
      expect(helperText).toBeInTheDocument();
    });

  });

  describe('Hidden Input', () => {

    test('renders hidden input with correct value', () => {
      const field = getFieldById('hidden_field');
      const props = {
        field,
        value: 'some-hidden-value',
        onChange: jest.fn()
      };

      const { container } = render(<FormField {...props} />);
      
      // Hidden inputs won't be found by normal queries, so use querySelector
      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput).toHaveAttribute('id', 'hidden_field');
      expect(hiddenInput).toHaveAttribute('value', 'some-hidden-value');
    });

  });

});