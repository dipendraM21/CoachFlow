import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRef } from 'react';
import { VERIFY_OTP_QUERY_KEY } from '../../constant/constant';
import { verifyOtp } from '../../store/apis';
import {
  VerifyOtpPayload,
  VerifyOtpResponse,
} from '../../types/auth/sendOtp.types';

export const useVerifyOtpMutation = (): UseMutationResult<
  VerifyOtpResponse,
  AxiosError<{ message: string }>,
  VerifyOtpPayload
> => {
  const abortControllerRef = useRef<AbortController | null>(null);

  return useMutation({
    mutationKey: VERIFY_OTP_QUERY_KEY,
    mutationFn: async (payload: VerifyOtpPayload) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      return verifyOtp(payload, controller.signal);
    },
    retry: false,
    networkMode: 'always',
  });
};
