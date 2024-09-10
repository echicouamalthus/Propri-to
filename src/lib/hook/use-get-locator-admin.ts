import { create } from 'zustand'

type locator = {
  AdminTenant: any | null
  getAdminTenant: (adminTenant: any | null) => void
}

export const useGetLocatorAdmin = create<locator>(set => ({
  AdminTenant: null,
  getAdminTenant: AdminTenant => {
    set({ AdminTenant })
  }
}))
