import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getDataFromAsyncStorage,
  removeItemFromAsyncStorage,
  storeDataInAsyncStorage,
} from '../utils/storage';

export interface AuthState {
  accessToken: string | null;
  isNewUser: boolean;
}

interface AuthContextType {
  isLoading: boolean;
  authState: AuthState;
  setAuth: (accessToken: string, isNewUser: boolean) => Promise<void>;
  updateUserStatus: (isNewUser: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    isNewUser: false,
  });

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const [accessToken, isNewUserStr] = await Promise.all([
          getDataFromAsyncStorage('accessToken'),
          getDataFromAsyncStorage('isNewUser'),
        ]);

        setAuthState({
          accessToken: accessToken || null,
          isNewUser: isNewUserStr === 'true',
        });
      } catch (error) {
        console.error('Failed to load auth', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuth();
  }, []);

  const setAuth = async (accessToken: string, isNewUser: boolean) => {
    try {
      // Fire storage updates but don't block state update if they fail
      const storagePromise = Promise.all([
        storeDataInAsyncStorage('accessToken', accessToken),
        storeDataInAsyncStorage('isNewUser', String(isNewUser)),
      ]).catch(err => console.warn('Storage persistence failed', err));

      setAuthState({
        accessToken,
        isNewUser,
      });

      await storagePromise;
    } catch (error) {
      console.error('Failed to set auth', error);
      // State is already set, so app flows. Error is just persistence.
    }
  };

  const updateUserStatus = async (isNewUser: boolean) => {
    try {
      await storeDataInAsyncStorage('isNewUser', String(isNewUser));
      setAuthState(prev => ({ ...prev, isNewUser }));
    } catch (error) {
      console.error('Failed to update user status', error);
    }
  };

  const logout = async () => {
    try {
      // Optimistically clear state first to trigger navigation
      setAuthState({
        accessToken: null,
        isNewUser: false,
      });

      await Promise.all([
        removeItemFromAsyncStorage('accessToken'),
        removeItemFromAsyncStorage('isNewUser'),
      ]);
    } catch (error) {
      console.error('Failed to logout', error);
      // State is already cleared, so we don't need to do much here
    } finally {
      // Ensure state is cleared in case of any weird race conditions,
      // though the initial setAuthState should have handled it.
      if (authState.accessToken) {
        setAuthState({
          accessToken: null,
          isNewUser: false,
        });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        authState,
        setAuth,
        updateUserStatus,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
