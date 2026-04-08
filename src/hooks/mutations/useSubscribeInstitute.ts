import { useMutation } from '@tanstack/react-query';
import { subscribeInstituteApi, unsubscribeInstituteApi } from '../../store/apis';
import { showError, showSuccess } from '../../utils/toast';

export const useSubscribeInstitute = () => {
  return useMutation({
    mutationFn: ({
      instituteId,
      unsubscribe = false,
    }: {
      instituteId: string;
      unsubscribe?: boolean;
    }) =>
      unsubscribe
        ? unsubscribeInstituteApi(instituteId)
        : subscribeInstituteApi(instituteId),
    onSuccess: (_data, variables) => {
      showSuccess(
        variables.unsubscribe
          ? 'Unsubscribed successfully!'
          : 'Subscribed successfully!',
      );
    },
    onError: (error: unknown, variables) => {
      const err = error as { response?: { data?: { message?: string } } };
      const action = variables.unsubscribe ? 'unsubscribe' : 'subscribe';
      const msg =
        err?.response?.data?.message || `Failed to ${action}. Please try again.`;
      showError(msg);
    },
  });
};
