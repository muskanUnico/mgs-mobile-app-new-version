import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemToLocalStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

export const getItemFromLocalStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // Data found in local storage
            return JSON.parse(value);
        } else {
            // Data not found
            console.log('No data found for key:', key);
            return null;
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
};

export const clearLocalStorage = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Local storage cleared successfully!');
    } catch (error) {
        console.error('Error clearing local storage:', error);
    }
};

export const removeItemFromLocalStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(key, 'cleared from local storage successfully!');
    } catch (error) {
        console.error('Error clearing local storage:', error);
    }
}