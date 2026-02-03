import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRef } from 'react';
import { UPDATE_PROFILE_QUERY_KEY } from '../../constant/constant';
import { createProfileApi, updateProfileApi } from '../../store/apis';
import { AxiosErrorResponse } from '../../types/common';
import { UpdateProfilePayload } from '../../types/profile';

export function useCreateProfileMutation() {
  const abortControllerRef = useRef<AbortController | null>(null);
  return useMutation({
    mutationKey: UPDATE_PROFILE_QUERY_KEY,
    mutationFn: async (payload: UpdateProfilePayload) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;
      return createProfileApi(payload, controller.signal);
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      return error;
    },
    retry: false,
  });
}

export function useUpdateProfileMutation() {
  const abortControllerRef = useRef<AbortController | null>(null);
  return useMutation({
    mutationKey: UPDATE_PROFILE_QUERY_KEY,
    mutationFn: async (payload: UpdateProfilePayload) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;
      return updateProfileApi(payload, controller.signal);
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      return error;
    },
    retry: false,
  });
}
