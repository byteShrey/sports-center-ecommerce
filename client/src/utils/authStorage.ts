import type { AuthUser } from '../models/auth';

const AUTH_KEY = 'sports-center.auth';

export const authStorage = {
  get: (): AuthUser | null => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
  },

  save: (user: AuthUser) => localStorage.setItem(AUTH_KEY, JSON.stringify(user)),

  clear: () => localStorage.removeItem(AUTH_KEY),
};
