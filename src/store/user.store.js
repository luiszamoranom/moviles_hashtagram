import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { customCapacitorStorage } from './storages/capacitor.storage';


export const useUserStore = create(
  persist((set) => ({
    user: {
      username: '',
      token: ''
    },

    handleLogin: (username, token) => set({ 
      user: {
        username,
        token 
      }
    }),
    handleLogout: () => {
      set({ token: '' })
      
    },
  }), {
    name: 'user-storage',
    storage: customCapacitorStorage
  })
)