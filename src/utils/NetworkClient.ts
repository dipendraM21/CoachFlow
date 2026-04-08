import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { Platform } from 'react-native';
import Config from '../config';
import { getDataFromAsyncStorage, removeItemFromAsyncStorage } from './storage';

class NetworkClient {
  private service: AxiosInstance;
  private onUnauthorized: (() => void) | null = null;

  constructor() {
    const baseURL =
      Config.BASE_URL || 'https://vishal-backend-kqvl.onrender.com/api/';

    this.service = axios.create({
      baseURL,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.service.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError,
    );

    this.service.interceptors.response.use(
      this.handleSuccess,
      this.handleError,
    );
  }

  // 🔐 Set Unauthorized Callback
  public setUnauthorizedCallback(callback: () => void) {
    this.onUnauthorized = callback;
  }

  // 📤 REQUEST INTERCEPTOR
  private handleRequest = async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    // Add platform header
    config.headers['x-client-type'] =
      Platform.OS === 'android' ? 'mobile-android' : 'mobile-ios';

    // Attach token
    const token = await getDataFromAsyncStorage('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Dynamic base URL (analytics case)
    if (config.url?.startsWith('log-analytics') && Config.ANALYTICS_BASE_URL) {
      config.baseURL = Config.ANALYTICS_BASE_URL;
    }

    // ✅ If the request body is FormData, remove Content-Type so the
    // runtime can auto-set 'multipart/form-data; boundary=...' correctly.
    // This must run in the interceptor (last step) to avoid being overwritten.
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    // 🔍 DEBUG LOG
    console.log('🚀 API REQUEST:', {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      data: config.data,
      headers: config.headers,
    });

    return config;
  };

  private handleRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.log('❌ REQUEST ERROR:', error.message);
    return Promise.reject(error);
  };

  // 📥 RESPONSE SUCCESS
  private handleSuccess = (response: AxiosResponse): AxiosResponse => {
    console.log('✅ API RESPONSE:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  };

  // ❌ RESPONSE ERROR
  private handleError = async (error: AxiosError): Promise<never> => {
    console.log('🔥 API ERROR:', {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      response: error.response?.data,
      status: error.response?.status,
    });

    // 🚨 NETWORK ERROR (Potential Timeout or DNS Issue)
    if (!error.response) {
      console.error('❌ NETWORK ERROR / TIMEOUT:', {
        message: error.message,
        code: error.code,
        config: {
          url: `${error.config?.baseURL}${error.config?.url}`,
          method: error.config?.method?.toUpperCase(),
          timeout: error.config?.timeout,
        },
        // Log the raw error for deeper inspection in DevTools
        rawError: error,
      });

      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        throw new Error(
          'Connection timed out. Render may be waking up - please try again in 30 seconds.',
        );
      }

      throw new Error(
        'Network error. Please check your internet or verify if the server is reachable.',
      );
    }

    // 🚨 UNAUTHORIZED / RATE LIMIT
    if (error.response.status === 401 || error.response.status === 429) {
      console.warn('Session expired or Too many requests. Logging out...');
      await removeItemFromAsyncStorage('accessToken');

      if (this.onUnauthorized) {
        this.onUnauthorized();
      }
    }

    // 🚨 SERVER ERROR MESSAGE
    const message =
      (error.response.data as any)?.message ||
      'Something went wrong. Please try again.';

    throw new Error(message);
  };

  // 🔁 GENERIC REQUEST METHOD
  private async request<T>(
    method: string,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.service.request<T>({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // 📦 PUBLIC METHODS
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  public post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  public put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  public patch<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }
}

export default new NetworkClient();
