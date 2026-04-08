import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthData } from '../hooks/queries/useAuthData';

interface CityContextType {
  currentCity: string | undefined;
  setCity: (city: string) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authUser } = useAuthData();
  const [currentCity, setCurrentCity] = useState<string | undefined>(
    authUser?.profile?.address?.city,
  );

  // Sync with authUser profile city initially or when user changes
  useEffect(() => {
    if (authUser?.profile?.address?.city && !currentCity) {
      setCurrentCity(authUser.profile.address.city);
    }
  }, [authUser, currentCity]);

  const setCity = (city: string) => {
    setCurrentCity(city);
  };

  return (
    <CityContext.Provider value={{ currentCity, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
