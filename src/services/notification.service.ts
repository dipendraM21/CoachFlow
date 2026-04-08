import messaging from '@react-native-firebase/messaging';
import { Platform, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { navigationRef } from '../navigation/AppNavigator';
import NetworkClient from '../utils/NetworkClient';

class NotificationService {
  /**
   * Request user permission for notifications (iOS + Android 13+)
   */
  async requestPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('✅ NOTIFICATION PERMISSION GRANTED');
        return true;
      } else {
        console.log('❌ NOTIFICATION PERMISSION DENIED');
        return false;
      }
    } catch (error) {
      console.error('🔥 Permission Error:', error);
      return false;
    }
  }

  /**
   * Fetch and sync FCM token
   */
  async getFcmToken() {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('📱 FCM TOKEN:', fcmToken);
        await this.sendTokenToBackend(fcmToken);
        return fcmToken;
      }
    } catch (error) {
      console.error('🔥 Get Token Error:', error);
    }
    return null;
  }

  /**
   * Sync token with backend
   */
  async sendTokenToBackend(token: string) {
    try {
      // Assuming endpoint for token registration (Update if needed)
      await NetworkClient.post('students/notifications/token', {
        fcmToken: token,
        platform: Platform.OS,
      });
      console.log('🚀 FCM Token synced with backend');
    } catch (error) {
      console.error('❌ Failed to sync FCM token:', error);
    }
  }

  /**
   * Setup all notification listeners
   */
  async setupListeners() {
    // 1. Foreground State
    messaging().onMessage(async (remoteMessage) => {
      console.log('✨ Message received in Foreground:', remoteMessage);

      // Show a custom toast/alert
      Toast.show({
        type: 'info',
        text1: remoteMessage.notification?.title || 'New Notification',
        text2: remoteMessage.notification?.body || '',
        onPress: () => this.handleNotificationClick(remoteMessage),
      });
    });

    // 2. Background State (App open but in background)
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('🌙 App opened from background state:', remoteMessage);
      this.handleNotificationClick(remoteMessage);
    });

    // 3. Quit/Killed State
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('💀 App opened from quit state:', remoteMessage);
          // Small delay to ensure navigation is ready
          setTimeout(() => {
            this.handleNotificationClick(remoteMessage);
          }, 1000);
        }
      });

    // 4. Token Refresh
    messaging().onTokenRefresh((token) => {
      console.log('🔄 Token refreshed:', token);
      this.sendTokenToBackend(token);
    });
  }

  /**
   * Logic to handle notification clicks and navigate
   */
  handleNotificationClick(remoteMessage: any) {
    if (!remoteMessage) return;

    const screen = remoteMessage.data?.screen || 'Notifications';
    const params = remoteMessage.data || {};

    if (navigationRef.isReady()) {
      navigationRef.navigate(screen, params);
    } else {
      console.warn('⚠️ Navigation ref not ready');
    }
  }

  /**
   * Initialize everything
   */
  async init() {
    const hasPermission = await this.requestPermission();
    if (hasPermission) {
      await this.getFcmToken();
      await this.setupListeners();
    }
  }
}

export default new NotificationService();
