import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import { getDataFromAsyncStorage, removeItemFromAsyncStorage } from './storage';

class NetworkClient {
  private service: AxiosInstance;

  constructor() {
    const baseURL =
      Config.BASE_URL || 'https://vishal-backend-kqvl.onrender.com/api/';
    this.service = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 60000, // 60 seconds timeout (increased for cold starts)
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

  // Interceptor: Request
  private handleRequest = async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    // Set headers
    config.headers['x-client-type'] =
      Platform.OS === 'android' ? 'mobile-android' : 'mobile-ios';

    // Get Token
    const token = await getDataFromAsyncStorage('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Dynamic Base URL support (Example adaptation)
    if (config.url?.startsWith('log-analytics') && Config.ANALYTICS_BASE_URL) {
      config.baseURL = Config.ANALYTICS_BASE_URL;
    }

    return config;
  };

  private handleRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };

  // Interceptor: Response
  private handleSuccess = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  private handleError = async (error: AxiosError): Promise<never> => {
    if (error.response?.status === 401) {
      // Handle Unauthorized Access
      // e.g., Toast.show("Session Expired");
      console.warn('Session expired. Logging out...');
      await removeItemFromAsyncStorage('token');
      // Navigation to Login logic requires global navigation ref or callback
    }
    return Promise.reject(error);
  };

  // Type-Safe Request Wrappers
  private async request<T>(
    method: string,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const baseURL = this.service.defaults.baseURL || '';
      console.log('API Request URL:', `${baseURL}${url}`);
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

  // Public Methods
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  public async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  public async patch<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }
}

export default new NetworkClient();
