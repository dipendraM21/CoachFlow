import Toast from 'react-native-toast-message';
import { ShowToastPayload } from '../types/toast/toast.types';

export const showToast = ({
  type,
  title,
  message,
  visibilityTime = 4000,
  autoHide = true,
}: ShowToastPayload) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    visibilityTime,
    autoHide,
    position: 'top',
  });
};

export const showSuccess = (message: string) => {
  showToast({
    type: 'success',
    title: 'Success',
    message,
  });
};

export const showError = (message: string) => {
  showToast({
    type: 'error',
    title: 'Error',
    message,
  });
};

export const showInfo = (message: string) => {
  showToast({
    type: 'info',
    title: 'Info',
    message,
  });
};

export const showWarning = (message: string) => {
  showToast({
    type: 'warning',
    title: 'Warning',
    message,
  });
};

/**
 * Backward compatibility alias if needed
 * @deprecated Use showError instead
 */
export const showErrorToast = (message: string) => {
  showError(message);
};
