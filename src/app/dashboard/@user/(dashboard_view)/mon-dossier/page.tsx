'use client'

import DataCard from '@/components/custom/dossier_de_locataire/data-card'
import { useGetLocator } from '@/lib/hook/use-get-Locator'
import React from 'react'

export default function MonDossier() {
  const { tenant } = useGetLocator()

  return (
    <div className='mx-auto mt-8 max-w-4xl'>
      <DataCard data={tenant} />
    </div>
  )
}
