import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AUTH_USER_QUERY_KEY } from '../../constant/constant';
import { uploadStudentProfilePhoto } from '../../store/apis';
import { AxiosErrorResponse } from '../../types/common';

export function useUploadProfilePhotoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return uploadStudentProfilePhoto(formData);
    },
    onSuccess: () => {
      // Invalidate auth user query to refresh profile image across the app
      queryClient.invalidateQueries({ queryKey: AUTH_USER_QUERY_KEY });
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      return error;
    },
    retry: false,
  });
}
