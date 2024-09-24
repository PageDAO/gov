import React, { createContext, useContext, useState } from 'react';

export const CharmverseContext = createContext();

export const useCharmverse = () => useContext(CharmverseContext);

export const CharmverseProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    // Implement login logic here
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Implement logout logic here
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <CharmverseContext.Provider value={value}>
      {children}
    </CharmverseContext.Provider>
  );
};
