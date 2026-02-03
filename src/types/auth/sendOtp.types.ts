export interface SendOtpPayload {
  phone: string;
  role: 'STUDENT';
}

export interface SendOtpResponseData {
  phone: string;
  role: 'STUDENT';
  expiresAt: string;
  expiresIn: number;
  message: string;
  otp: string;
}

export interface SendOtpResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: SendOtpResponseData;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
}

export interface Profile {
  _id?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  avatar: string;
  address: {
    city: string;
    country?: string;
  };
  enrolledBatches?: unknown[];
  interests?: unknown[];
  profileCompletion?: number;
}

export interface User {
  _id: string; // Used by frontend logic
  id?: string; // Sometimes returned by backend
  phone: string;
  role: 'STUDENT';
  isActive: boolean;
  isVerified: boolean;
  hasProfile: boolean;
  name?: string;
  email?: string;
  profileImage?: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
  profileModel?: string;
  profile?: Profile;
}

export interface VerifyOtpResponseData {
  user: User;
  token: string;
  isNewUser: boolean;
}

export interface VerifyOtpResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: VerifyOtpResponseData;
}

export interface GetAuthUserResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}
