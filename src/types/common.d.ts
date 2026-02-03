export interface SendOtpPayload {
  phone: string;
  role: string;
}

export interface AxiosErrorResponse {
  message: string;
  name: string;
  code: string;
  config: AxiosRequestConfig;
  request: Record<string, unknown>;
  response: AxiosErrorResponseData;
  status: number;
  statusText: string;
  userMessage: string;
  timestamp: string;
}

export interface GetBatchesPayload {
  page?: number;
  limit?: number;
  city?: string;
}
