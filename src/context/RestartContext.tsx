import React, { createContext, ReactNode, useContext, useState } from 'react';

interface RestartContextType {
  reloadApp: () => void;
  key: number;
}

const RestartContext = createContext<RestartContextType | undefined>(undefined);

export const RestartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [key, setKey] = useState(0);

  const reloadApp = () => {
    setKey(prev => prev + 1);
  };

  return (
    <RestartContext.Provider value={{ reloadApp, key }}>
      {children}
    </RestartContext.Provider>
  );
};

export const useRestart = () => {
  const context = useContext(RestartContext);
  if (!context) {
    throw new Error('useRestart must be used within a RestartProvider');
  }
  return context;
};
