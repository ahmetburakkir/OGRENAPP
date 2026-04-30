import { create } from "zustand";

interface AuthState {
  token: string | null;
  role: string | null;
  userId: string | null;
  setAuth: (token: string, role: string, userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("ogrenapp_token"),
  role: localStorage.getItem("ogrenapp_role"),
  userId: localStorage.getItem("ogrenapp_userId"),

  setAuth: (token, role, userId) => {
    localStorage.setItem("ogrenapp_token", token);
    localStorage.setItem("ogrenapp_role", role);
    localStorage.setItem("ogrenapp_userId", userId);
    set({ token, role, userId });
  },

  logout: () => {
    localStorage.removeItem("ogrenapp_token");
    localStorage.removeItem("ogrenapp_role");
    localStorage.removeItem("ogrenapp_userId");
    set({ token: null, role: null, userId: null });
  },
}));
