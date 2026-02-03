import { useQuery } from '@tanstack/react-query';
import { AUTH_USER_QUERY_KEY } from '../../constant/constant';
import { useAuth } from '../../context/AuthContext';
import { getAuthUserApi } from '../../store/apis';
import { GetAuthUserResponse } from '../../types/auth/sendOtp.types';

export const useAuthData = () => {
  const { authState, logout, isLoading: isContextLoading } = useAuth();
  const { accessToken, isNewUser } = authState;

  const {
    data: authUserData,
    isLoading: isUserLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: AUTH_USER_QUERY_KEY,
    queryFn: async () => {
      const response =
        (await getAuthUserApi()) as unknown as GetAuthUserResponse;
      return response;
    },
    enabled: !!accessToken,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const authUser = authUserData?.data?.user || null;
  const isAuthenticated = !!accessToken;
  const isAuthLoading = isContextLoading || (!!accessToken && isUserLoading);

  return {
    accessToken,
    authUser,
    isAuthLoading,
    isAuthenticated,
    isNewUser,
    refetchAuthUser: refetch,
    logout,
    isFetchingUser: isFetching,
  };
};
