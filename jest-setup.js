import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Add any other global mocks here if needed
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
