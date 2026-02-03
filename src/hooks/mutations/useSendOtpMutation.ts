import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRef } from 'react';
import { SEND_OTP_QUERY_KEY } from '../../constant/constant';
import { sendOtp } from '../../store/apis';
import {
  SendOtpPayload,
  SendOtpResponse,
} from '../../types/auth/sendOtp.types';

export const useSendOtpMutation = (): UseMutationResult<
  SendOtpResponse,
  AxiosError<SendOtpResponse>,
  SendOtpPayload
> => {
  const abortControllerRef = useRef<AbortController | null>(null);

  return useMutation({
    mutationKey: SEND_OTP_QUERY_KEY,
    mutationFn: async (payload: SendOtpPayload) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      return sendOtp(payload, controller.signal);
    },
    retry: false,
    networkMode: 'always',
  });
};
