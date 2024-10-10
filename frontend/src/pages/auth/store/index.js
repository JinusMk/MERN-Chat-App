import { create } from 'zustand'
import { devtools } from 'zustand/middleware';

const useAuthStore = create(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
  }), { name: 'MERN-CHAT-APP-auth-store' })
);

export default useAuthStore;
