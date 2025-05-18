import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = <T>(key: string, initialValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(initialValue);

	useEffect(() => {
		(async () => {
			try {
				const item = await AsyncStorage.getItem(key);
				if (item) setStoredValue(JSON.parse(item));
			} catch (error) {
				console.error('Error reading local storage:', error);
			}
		})();
	}, [key]);

	useEffect(() => {
		(async () => {
			try {
				await AsyncStorage.setItem(key, JSON.stringify(storedValue));
			} catch (error) {
				console.error('Error saving to local storage:', error);
			}
		})();
	}, [key, storedValue]);

	return [storedValue, setStoredValue] as const;
};

export default useAsyncStorage;
