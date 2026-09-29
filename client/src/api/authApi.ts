import { http } from './http';
import type { AuthUser, LoginRequest } from '../models/auth';

export const authApi = {
  login: (request: LoginRequest) => http.post<AuthUser>('/auth/login', request).then((res) => res.data),

  currentUser: () => http.get<{ username: string }>('/auth/me').then((res) => res.data),
};
