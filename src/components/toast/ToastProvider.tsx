import React from 'react';
import Toast from 'react-native-toast-message';
import { toastConfig } from './toastConfig';

export const ToastProvider: React.FC = () => {
  return <Toast config={toastConfig} />;
};
