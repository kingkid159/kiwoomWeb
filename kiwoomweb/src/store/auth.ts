import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  logout: () => set({ accessToken: null }),
}));

interface KiwoomOauthState {
  oauthToken: string | null;
  setOauthToken: (token: string) => void;
}

export const useKiwoomOauthStore = create<KiwoomOauthState>((set) => ({
  oauthToken: null,
  setOauthToken: (token) => set({ oauthToken: token }),
}));