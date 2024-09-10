import ButtonBack from '@/components/ButtonBack'
import NavBarDashboard from '@/components/custom/tableau_de_bord/nav_bar_dashboard'
import React from 'react'
import { Toaster } from 'sonner'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex w-full flex-col'>
      <NavBarDashboard />
      {/* <ButtonBack /> */}
      {children}
      <Toaster richColors />
    </div>
  )
}
