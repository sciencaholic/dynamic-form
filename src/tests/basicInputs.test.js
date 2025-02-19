import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { getFieldById, getFieldByType } from './testUtils';

import FormField from '../components/form/FormField';
import { validateInput } from '../utils/validation';

// Mock the validation utility
jest.mock('../utils/validation', () => ({
	validateInput: jest.fn()
}));

describe('Basic Input Field Tests', () => {

	beforeEach(() => {
		jest.clearAllMocks();
		validateInput.mockImplementation(() => '');
	});


	test('renders text input with correct attributes', () => {
		const field = getFieldById('firstname');
		const props = {
			field,
			value: '',
			onChange: jest.fn()
		};

		render(<FormField {...props} />);
		
		expect(screen.getByText(/First Name/)).toBeInTheDocument();
		expect(screen.getByText('*')).toBeInTheDocument(); // required indicator

		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toHaveAttribute('id', 'firstname');
		expect(inputElement).toHaveAttribute('type', 'text');
		expect(inputElement).toHaveAttribute('placeholder', 'Pratiksha');
		expect(inputElement).toBeRequired();
	});

	test('text input handles value changes', () => {
		const field = getFieldById('firstname');
		const onChange = jest.fn();
		const props = {
			field,
			value: '',
			onChange
		};

		render(<FormField {...props} />);
		
		const inputElement = screen.getByRole('textbox');
		fireEvent.change(inputElement, { target: { value: 'John' } });
		expect(onChange).toHaveBeenCalledWith('firstname', 'John');
	});

	test('disabled input prevents interaction', () => {
		const field = getFieldById('lastname');
		const props = {
			field,
			value: '',
			onChange: jest.fn()
		};

		render(<FormField {...props} />);
		
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeDisabled(); // Verifying it's disabled
		expect(inputElement).toHaveClass('cursor-not-allowed');
	});

	test('number input has min/max constraints', () => {
		const field = getFieldById('age');
		const props = {
			field,
			value: '',
			onChange: jest.fn()
		};

		render(<FormField {...props} />);
		
		const inputElement = screen.getByLabelText(/Age/);
		expect(inputElement).toHaveAttribute('type', 'number');
		expect(inputElement).toHaveAttribute('min', '0');
		expect(inputElement).toHaveAttribute('max', '120');
		fireEvent.change(inputElement, { target: { value: '25' } });
		expect(props.onChange).toHaveBeenCalledWith('age', '25');
	});

	test('password input obscures text', async () => {
		const field = getFieldById('password');
		const onChange = jest.fn();
		const props = {
			field,
			value: 'validPass123',
			onChange: jest.fn()
		};

		render(<FormField {...props} />);
		
		const passwordInput = screen.getByLabelText(/Password/);
		expect(passwordInput).toHaveAttribute('type', 'password');
		expect(passwordInput).toHaveValue('validPass123'); // Value should be set but not visible as plain text		
	});

	test('password input validates input format', async () => {
		const field = getFieldById('password');
		const props = {
			field,
			value: '',
			onChange: jest.fn()
		};
		
		// Set up validation mock to return an error
		validateInput.mockReturnValue(field.validation.message);
		
		render(<FormField {...props} />);
		
		const passwordInput = screen.getByLabelText(/Password/);
		fireEvent.change(passwordInput, { target: { value: 'shortpw' } });
		fireEvent.blur(passwordInput);
		expect(validateInput).toHaveBeenCalledWith(field, 'shortpw');
		const errorMessage = await screen.findByText(field.validation.message);
		expect(errorMessage).toBeInTheDocument();
	});

	test('url input accepts valid URLs', () => {
		const field = getFieldById('website');
		const props = {
			field,
			value: '',
			onChange: jest.fn()
		};

		render(<FormField {...props} />);
		
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toHaveAttribute('type', 'url');
		fireEvent.change(inputElement, { target: { value: 'https://abc.com' } });
		expect(props.onChange).toHaveBeenCalledWith('website', 'https://abc.com');
	});

	test('date input has correct format', () => {
		const field = getFieldById('birthdate');
		const props = {
			field,
			value: '1990-01-01',
			onChange: jest.fn()
		};

		render(<FormField {...props} />);
		
		const dateInput = screen.getByLabelText(/Date of Birth/);
		expect(dateInput).toHaveAttribute('type', 'date');
		expect(dateInput).toHaveValue('1990-01-01');
		fireEvent.change(dateInput, { target: { value: '2000-05-15' } });
		expect(props.onChange).toHaveBeenCalledWith('birthdate', '2000-05-15');
	});

	test('search input has appropriate styling', () => {
		const field = getFieldById('search_query');
		const props = {
			field,
			value: '',
			onChange: jest.fn()
		};

		render(<FormField {...props} />);
		
		const searchInput = screen.getByRole('searchbox');
		expect(searchInput).toHaveAttribute('type', 'search');
		expect(searchInput).toHaveAttribute('placeholder', 'Type to search...');
		expect(screen.getByText('Enter keywords to search')).toBeInTheDocument();
	});

	test('phone number input renders correctly with validation', () => {
		const field = getFieldById('phone_number');
		const props = {
			field,
			value: '',
			onChange: jest.fn()
		};
	
		render(<FormField {...props} />);
		
		const phoneInput = screen.getByLabelText(/Phone Number/);
		expect(phoneInput).toHaveAttribute('type', 'tel');
		expect(phoneInput).toHaveAttribute('placeholder', '+91 9876654321');
		expect(phoneInput).not.toBeRequired(); // since required: false
		const helperText = screen.getByText(field.helperText);
		expect(helperText).toBeInTheDocument();

		fireEvent.change(phoneInput, { target: { value: '9185554433222' } }); // TODO: handle multiple checks like this
		fireEvent.blur(phoneInput);
		const errorMessage = screen.queryByText(field.validation.message);
		expect(errorMessage).toBeInTheDocument();
	});

	test('correctly detects field type and uses appropriate input element', () => {
		const inputTypes = [
			'text', 'email', 'password', 'number', 'url', 'tel', 
			'date', 'time', 'datetime-local', 'month', 'week', 'search'
		];
		
		inputTypes.forEach(inputType => {
			const field = getFieldByType(inputType);
			const props = {
				field,
				value: '',
				onChange: jest.fn()
			};
	
			const { container, unmount } = render(<FormField {...props} />);
			const input = container.querySelector(`#${field.id}`);
			expect(input).not.toBeNull();
			expect(input).toHaveAttribute('type', inputType);
			expect(input.tagName).toBe('INPUT');
			
			unmount();
		});
	});

	test('shows helper text when provided', () => {
		const field = getFieldById('email');
		const props = {
			field,
			value: '',
			onChange: jest.fn()
		};

		render(<FormField {...props} />);
		
		expect(screen.getByText(field.helperText)).toBeInTheDocument();
		expect(screen.getByText(field.helperText)).toHaveClass('text-gray-500');
	});
});