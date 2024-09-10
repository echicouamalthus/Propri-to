import { DataTableDemo } from '@/components/custom/proprietaire/data-table'
import { GetAllProprietaireUseCase } from '@/use-cases/proprietaire/getAllProprietaire.use.case'
import React from 'react'

export default async function Proprietaire() {
  const owners = await GetAllProprietaireUseCase()

  return (
    <main className='px-4 py-2'>
      <DataTableDemo data={owners} />
    </main>
  )
}
