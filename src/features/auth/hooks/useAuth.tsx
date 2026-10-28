'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../domain/types';
import { authService } from '../services/auth.service';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Restaurar sesión desde localStorage al cargar
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('valkia_token');
      const storedUser = localStorage.getItem('valkia_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Error restaurando sesión:', e);
      localStorage.removeItem('valkia_token');
      localStorage.removeItem('valkia_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      try {
        const response = await authService.login(credentials);
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('valkia_token', response.token);
        localStorage.setItem('valkia_user', JSON.stringify(response.user));
        if (response.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const register = useCallback(
    async (data: RegisterCredentials) => {
      setIsLoading(true);
      try {
        const response = await authService.register(data);
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('valkia_token', response.token);
        localStorage.setItem('valkia_user', JSON.stringify(response.user));
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('valkia_token');
    localStorage.removeItem('valkia_user');
    router.push('/login');
  }, [router]);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
