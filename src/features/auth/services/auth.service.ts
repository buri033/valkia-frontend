import { httpClient } from '../../common/http';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../domain/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return httpClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async register(data: RegisterCredentials): Promise<AuthResponse> {
    return httpClient<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getProfile(): Promise<{ user: User }> {
    return httpClient<{ user: User }>('/auth/me', {
      method: 'GET',
    });
  },
};
