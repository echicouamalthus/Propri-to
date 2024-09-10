import { TLocataire } from '@/entites/locataire'
import { create } from 'zustand'

type locator = {
  tenant: TLocataire | null
  getTenant: (tenant: TLocataire | null) => void
}

export const useGetLocator = create<locator>(set => ({
  tenant: null,
  getTenant: tenant => {
    set({ tenant })
  }
}))
