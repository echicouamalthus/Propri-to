import NavBarDashbaord_2 from '@/components/custom/tableau_de_bord/nav_bar_dashbaord_2'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBarDashbaord_2 />
      {children}
    </div>
  )
}
