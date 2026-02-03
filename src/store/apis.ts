import Config from 'react-native-config';
import {
  GetAuthUserResponse,
  SendOtpPayload,
  SendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from '../types/auth/sendOtp.types';
import { GetBatchDetailResponse, GetBatchesResponse } from '../types/batch.d';
import { GetBatchesPayload } from '../types/common';
import { UpdateProfilePayload } from '../types/profile';
import NetworkClient from '../utils/NetworkClient';

export interface FcmTokenPayload {
  token: string;
  platform?: 'android' | 'ios' | 'web';
}

const generateApiUrl = (
  path: string,
  params: Record<string, string | number | boolean | undefined>,
) => {
  const url = new URL(path, Config.BASE_URL);
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  }

  return `${url.toString()}?${searchParams.toString()}`;
};

export const sendOtp = async (
  payload: SendOtpPayload,
  signal?: AbortSignal,
) => {
  const url = 'auth/send-otp';
  return NetworkClient.post<SendOtpResponse>(url, payload, {
    signal,
  });
};

export const verifyOtp = async (
  payload: VerifyOtpPayload,
  signal?: AbortSignal,
) => {
  const url = 'auth/verify-otp';
  return NetworkClient.post<VerifyOtpResponse>(url, payload, {
    signal,
  });
};

export async function getAuthUserApi() {
  return NetworkClient.get<GetAuthUserResponse>('auth/me');
}

export async function saveFcmTokenApi(obj: FcmTokenPayload) {
  return NetworkClient.post('v2/customer/save-fcm-token', obj);
}

export async function createProfileApi(
  obj: UpdateProfilePayload,
  signal?: AbortSignal,
) {
  return NetworkClient.post('students/profile', obj, {
    signal,
  });
}

export async function updateProfileApi(
  obj: UpdateProfilePayload,
  signal?: AbortSignal,
) {
  return NetworkClient.put('students/profile', obj, {
    signal,
  });
}
export async function logoutApi() {
  return NetworkClient.post('auth/logout');
}

export const getBatchListApi = (data: GetBatchesPayload) => {
  const queryParameters = {
    ...(data.page ? { page: data.page.toString() } : {}),
    ...(data.limit ? { limit: data.limit.toString() } : {}),
    ...(data.city ? { city: data.city } : {}),
  };

  const apiUrl = generateApiUrl('students/feed', queryParameters);
  return NetworkClient.get<GetBatchesResponse>(apiUrl);
};

export const getBatchDetailsByApi = (id: string) => {
  const apiUrl = `students/batch/${id}`;
  return NetworkClient.get<GetBatchDetailResponse>(apiUrl);
};

import { GetInstituteDetailsResponse } from '../types/academy';

export const getInstituteDetailsByApi = (id: string) => {
  const apiUrl = `students/institute/${id}`;
  return NetworkClient.get<GetInstituteDetailsResponse>(apiUrl);
};

import { UploadProfilePhotoResponse } from '../types/profile';

export const uploadStudentProfilePhoto = async (formData: FormData) => {
  const url = 'upload/student/profile-photo';
  return NetworkClient.post<UploadProfilePhotoResponse>(url, formData, {
    headers: {
      'Content-Type': undefined,
    },
    transformRequest: (data, _headers) => {
      return data;
    },
  });
};
