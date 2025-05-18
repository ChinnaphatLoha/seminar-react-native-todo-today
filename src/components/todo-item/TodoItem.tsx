import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '../../types';

interface TodoItemProps {
	item: Todo;
	handleDeleteTodo: (id: string) => void;
	handleEditTodo: (id: string, text: string) => void;
}

const TodoItem = ({
	item,
	handleDeleteTodo,
	handleEditTodo,
}: TodoItemProps) => {
	return (
		<View style={styles.todoItem}>
			<Text style={styles.todoText}>{item.text}</Text>
			<View style={styles.actions}>
				<TouchableOpacity
					testID='edit-btn'
					onPress={() => handleEditTodo(item.id, item.text)}
				>
					<Ionicons
						name='pencil'
						size={20}
						color='blue'
					/>
				</TouchableOpacity>
				<TouchableOpacity
					testID='delete-btn'
					onPress={() => handleDeleteTodo(item.id)}
				>
					<Ionicons
						name='trash'
						size={20}
						color='red'
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	todoItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	todoText: {
		fontSize: 16,
	},
	actions: {
		flexDirection: 'row',
		gap: 8,
	},
});

export default TodoItem;
