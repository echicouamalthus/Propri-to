import { create } from 'zustand'

type clientType = {
  role: 'admin' | 'user' | null
  verifyRole: (char: 'admin' | 'user' | null) => void
}

export const useClientRole = create<clientType>(set => ({
  role: null,
  verifyRole: char => {
    set({ role: char })
  }
}))
