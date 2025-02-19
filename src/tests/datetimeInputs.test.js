import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { getFieldById, getFieldByType } from './testUtils';

import FormField from '../components/form/FormField';
import { validateInput } from '../utils/validation';

jest.mock('../utils/validation', () => ({
	validateInput: jest.fn()
}));

describe('Date/Time Input Field Tests', () => {

	beforeEach(() => {
		jest.clearAllMocks();
		validateInput.mockImplementation(() => '');
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

	test('correctly detects field type and uses appropriate input element', () => {
		const inputTypes = [ 'date', 'time', 'datetime-local', 'month', 'week' ];
		
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

});