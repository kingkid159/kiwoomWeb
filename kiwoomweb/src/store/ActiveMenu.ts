import { create } from 'zustand';

interface ActiveMenuState {
  menuName: string | null;
  setMenuName: (token: string) => void;
}

export const useActiveMenuStore = create<ActiveMenuState>((set) => ({
  menuName: null,
  setMenuName: (menuName) => set({ menuName: menuName }),
}));