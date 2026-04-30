import React, { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  role: string | null;
  login: (payload: { token: string; userId: string; role: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'ogrenapp_token';
const USER_ID_KEY = 'ogrenapp_user_id';
const ROLE_KEY = 'ogrenapp_role';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem(USER_ID_KEY));
  const [role, setRole] = useState<string | null>(() => localStorage.getItem(ROLE_KEY));

  const login = (payload: { token: string; userId: string; role: string }) => {
    setToken(payload.token);
    setUserId(payload.userId);
    setRole(payload.role);
    localStorage.setItem(TOKEN_KEY, payload.token);
    localStorage.setItem(USER_ID_KEY, payload.userId);
    localStorage.setItem(ROLE_KEY, payload.role);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setRole(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(ROLE_KEY);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      token,
      userId,
      role,
      login,
      logout,
    }),
    [role, token, userId],
  );

  return (
    <AuthContext.Provider value={value}>
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
