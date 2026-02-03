import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRestart } from '../../context/RestartContext';
import { logoutApi } from '../../store/apis';
import { showError, showSuccess } from '../../utils/toast';
import { useAuthData } from '../queries/useAuthData';

export const useLogoutMutation = () => {
  const { logout } = useAuthData();
  const queryClient = useQueryClient();
  const { reloadApp } = useRestart();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: async () => {
      showSuccess('Logged out successfully');
      await logout();
      queryClient.removeQueries();

      // Delay slightly to allow toast to show/finish if needed, or just reload immediately.
      // Reloading immediately is safer for state.
      setTimeout(() => {
        reloadApp();
      }, 500); // Small delay to let the toast appear at least? Or maybe just reload.
      // If we reload, the toast context is also destroyed.
      // But the user asked for reload info.
      // The "logout" flow is now: AuthState cleared -> Login Screen -> (500ms) -> Reload.
      // Actually, if we just reload, we don't need the previous fixes?
      // No, we still want the standard logout. The reload is the "failsafe".
      // Let's keep the timeout short.
    },
    onError: async (error: unknown) => {
      // Even if server logout fails, we should logout locally
      const err = error as { response?: { data?: { message?: string } } };
      const msg = err?.response?.data?.message || 'Logout failed on server';
      showError(msg);
      await logout();
      queryClient.removeQueries();

      setTimeout(() => {
        reloadApp();
      }, 500);
    },
  });
};
