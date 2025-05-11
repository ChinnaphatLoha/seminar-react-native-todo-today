import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TextInput,
	Button,
	Alert,
	TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types';
import { TodoItem } from '../components';
import { useLocalStorage } from '../hooks';

const HomeScreen = () => {
	const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
	const [input, setInput] = useState('');
	const [editingId, setEditingId] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			const today = new Date().toDateString();
			try {
				const storedDate = await AsyncStorage.getItem('lastDate');
				if (storedDate !== today) {
					setTodos([]);
					await AsyncStorage.setItem('lastDate', today);
				}
			} catch (error) {
				console.error('Error handling date reset:', error);
			}
		})();
	}, []);

	const handleAddTodo = () => {
		if (!input.trim()) {
			Alert.alert('Validation', 'Todo cannot be empty!');
			return;
		}

		if (editingId) {
			setTodos((prev) =>
				prev.map((todo) =>
					todo.id === editingId ? { ...todo, text: input } : todo,
				),
			);
			setEditingId(null);
		} else {
			setTodos((prev) => [...prev, { id: Date.now().toString(), text: input }]);
		}
		setInput('');
	};

	const handleDeleteTodo = (id: string) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	const handleEditTodo = (id: string, text: string) => {
		setInput(text);
		setEditingId(id);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Todo Today</Text>
			<TextInput
				style={styles.input}
				placeholder='Enter a todo...'
				value={input}
				onChangeText={setInput}
			/>
			<Button
				title={editingId ? 'Update Todo' : 'Add Todo'}
				onPress={handleAddTodo}
			/>
			<FlatList
				data={todos}
				keyExtractor={(item) => item.id}
				renderItem={(info) => (
					<TodoItem
						item={info.item}
						handleDeleteTodo={handleDeleteTodo}
						handleEditTodo={handleEditTodo}
					/>
				)}
				ListEmptyComponent={<Text style={styles.emptyText}>No todos yet!</Text>}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 8,
		marginBottom: 16,
	},
	emptyText: {
		textAlign: 'center',
		marginTop: 16,
		color: '#888',
	},
});

export default HomeScreen;
