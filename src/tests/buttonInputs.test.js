import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { getFieldById } from './testUtils';

import FormField from '../components/form/FormField';

describe('Button Input Components', () => {

  describe('Button Inputs', () => {

    const buttonTypes = ['button', 'submit', 'reset'];    
    buttonTypes.forEach(buttonType => {
      const buttonIdMap = {
        'button': 'action_button',
        'submit': 'submit_button',
        'reset': 'reset_button'
      };
      
      test(`renders ${buttonType} button correctly`, () => {
        const field = getFieldById(buttonIdMap[buttonType]);
        const props = {
          field,
          value: null,
          onChange: jest.fn()
        };

        render(<FormField {...props} />);
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('id', buttonIdMap[buttonType]);
        expect(button).toHaveAttribute('type', buttonType);
        expect(button).toHaveTextContent(field.label);
        expect(button).not.toBeDisabled();
      });
      
    });
    
  });

  describe('Image Input', () => {

    test('renders image input correctly', () => {
      const field = getFieldById('profile_image');
      const props = {
        field,
        value: null,
        onChange: jest.fn()
      };

      const { container } = render(<FormField {...props} />);
      
      const imageInput = container.querySelector('input[type="image"]');
      expect(imageInput).toBeInTheDocument();
      expect(imageInput).toHaveAttribute('id', 'profile_image');
      expect(imageInput).toHaveAttribute('src', field.src);
      expect(imageInput).toHaveAttribute('alt', field.alt);
    });
    
  });

});