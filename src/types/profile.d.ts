export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  avatar: string;
  address: {
    city: string;
  };
}

export interface UploadProfilePhotoResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
}
