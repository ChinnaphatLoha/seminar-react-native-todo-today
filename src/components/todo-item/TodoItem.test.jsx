import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoItem from './TodoItem';

jest.mock('@expo/vector-icons', () => {
	return {
		Ionicons: ({ name, size, color }) => null,
	};
});

describe('TodoItem', () => {
	const mockDelete = jest.fn();
	const mockEdit = jest.fn();
	const todo = {
		id: '1',
		text: 'Test Todo',
	};

	const setup = () =>
		render(
			<TodoItem
				item={todo}
				handleDeleteTodo={mockDelete}
				handleEditTodo={mockEdit}
			/>,
		);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the todo text', () => {
		const { getByText } = setup();

		expect(getByText('Test Todo')).toBeTruthy();
	});

	it('calls handleEditTodo with correct arguments when edit button is pressed', () => {
		const { getByTestId } = setup();

		fireEvent.press(getByTestId('edit-btn'));

		expect(mockEdit).toHaveBeenCalledWith('1', 'Test Todo');
	});

	it('calls handleDeleteTodo with correct arguments when delete button is pressed', () => {
		const { getByTestId } = setup();

		fireEvent.press(getByTestId('delete-btn'));

		expect(mockDelete).toHaveBeenCalledWith('1');
	});
});
