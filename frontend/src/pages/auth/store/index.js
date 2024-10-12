import { create } from 'zustand'
import { devtools } from 'zustand/middleware';

const useAuthStore = create(
  devtools((set) => ({
    isLoggedIn: false,
    user: null,
    setUser: (user) => set({ user }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    logout: () => set({ user: null, isLoggedIn: false }),
  }), { name: 'MERN-CHAT-APP-auth-store' })
);

export default useAuthStore;
