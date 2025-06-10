import React, { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // define the state
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  // save user to localStorage
  const saveUserToLocalStorage = (user) => {
    localStorage.setItem("task", JSON.stringify(user));
  };

  // get user from localStorage
  const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("task");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  // clear user from localStorage
  const clearUserFromLocalStorage = () => {
    localStorage.removeItem("task");
  };

  const setupTokenExpiration = useCallback((expiryTime) => {
    const timeout = expiryTime - Date.now();
    if (timeout > 0) {
      setTimeout(logout, timeout);
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    const storedUser = loadUserFromLocalStorage();
    if (
      storedUser &&
      storedUser.tokenExpiry &&
      storedUser.tokenExpiry > Date.now()
    ) {
      setUser(storedUser);
      setupTokenExpiration(storedUser.tokenExpiry);
    } else {
      clearUserFromLocalStorage();
    }
    setLoading(false);
  }, [setupTokenExpiration]);

  const logout = useCallback(() => {
    setUser(null);
    clearUserFromLocalStorage();
  }, []);

  const storeUser = useCallback(
    (userInfo) => {
      console.log(userInfo);
      const tokenLifetime = 24 * 60 * 60 * 1000;
      const tokenExpiry = Date.now() + tokenLifetime;
      const userWithExpiry = { ...userInfo, tokenExpiry };
      setUser(userWithExpiry);
      saveUserToLocalStorage(userWithExpiry);
      setupTokenExpiration(tokenExpiry);
    },
    [setupTokenExpiration]
  );

  return (
    <AuthContext.Provider value={{ user, logout, storeUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};