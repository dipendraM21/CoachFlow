import Config from '../config';
import {
  GetAuthUserResponse,
  SendOtpPayload,
  SendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from '../types/auth/sendOtp.types';
import {
  GetBatchDetailResponse,
  GetClassesResponse,
  GetLibrariesResponse,
} from '../types/batch.d';
import { GetBatchesPayload } from '../types/common';
import {
  UpdateProfilePayload,
  UploadProfilePhotoResponse,
} from '../types/profile';
import NetworkClient from '../utils/NetworkClient';
import { getDataFromAsyncStorage } from '../utils/storage';

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
    ...(data.city ? { city: data.city, district: data.city } : {}),
  };

  const apiUrl = generateApiUrl('students/classes', queryParameters);
  return NetworkClient.get<GetClassesResponse>(apiUrl);
};

export const getLibraryListingApi = (data: GetBatchesPayload) => {
  const queryParameters = {
    ...(data.page ? { page: data.page.toString() } : {}),
    ...(data.limit ? { limit: data.limit.toString() } : {}),
    ...(data.city ? { city: data.city } : {}),
    ...(data.district ? { district: data.district } : {}),
  };

  const apiUrl = generateApiUrl('students/libraries', queryParameters);
  return NetworkClient.get<GetLibrariesResponse>(apiUrl);
};

export const getBatchDetailsByApi = (id: string) => {
  const apiUrl = `students/batch/${id}`;
  return NetworkClient.get<GetBatchDetailResponse>(apiUrl);
};

export const subscribeInstituteApi = (id: string) => {
  return NetworkClient.post(`students/institute/${id}/subscribe`);
};

export const unsubscribeInstituteApi = (id: string) => {
  return NetworkClient.delete(`students/institute/${id}/subscribe`);
};

import {
  GetInstituteBatchesPayload,
  GetInstituteBatchesResponse,
  GetInstituteDetailsResponse,
  GetPublicInstituteProfileResponse,
} from '../types/academy';

export const getInstituteDetailsByApi = (id: string) => {
  const apiUrl = `students/institute/${id}`;
  return NetworkClient.get<GetInstituteDetailsResponse>(apiUrl);
};

export const getPublicInstituteProfileApi = (id: string) => {
  const apiUrl = `students/institute/${id}`;
  return NetworkClient.get<GetPublicInstituteProfileResponse>(apiUrl);
};

export const getInstituteBatchesApi = (data: GetInstituteBatchesPayload) => {
  const queryParameters = {
    ...(data.page ? { page: data.page.toString() } : {}),
    ...(data.limit ? { limit: data.limit.toString() } : {}),
    ...(data.filter ? { filter: data.filter } : {}),
  };

  const apiUrl = generateApiUrl(
    `students/institute/${data.id}/batches`,
    queryParameters,
  );
  return NetworkClient.get<GetInstituteBatchesResponse>(apiUrl);
};

export const uploadStudentProfilePhoto = async (
  formData: FormData,
): Promise<UploadProfilePhotoResponse> => {
  console.log('check158', formData);

  const token = await getDataFromAsyncStorage('accessToken');
  const baseURL =
    Config.BASE_URL || 'https://vishal-backend-kqvl.onrender.com/api/';
  const url = `${baseURL}upload/student/profile-photo`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // ⚠️ Do NOT set Content-Type here — fetch + FormData sets it
      // automatically with the correct multipart/form-data boundary
    },
    body: formData,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json?.message || `Upload failed with status ${response.status}`,
    );
  }

  return json;
};
