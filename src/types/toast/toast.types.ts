export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  type: ToastType;
  text1?: string;
  text2?: string;
  hide?: () => void;
  // react-native-toast-message specific props passed down
  props?: Record<string, unknown>;
}

export interface ShowToastPayload {
  type: ToastType;
  title?: string;
  message: string;
  visibilityTime?: number;
  autoHide?: boolean;
}
