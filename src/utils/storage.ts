import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataFromAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error('Error reading value from storage', e);
    return null;
  }
};

export const storeDataInAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn('Error storing value in storage', e);
  }
};

export const removeItemFromAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing value from storage', e);
  }
};
