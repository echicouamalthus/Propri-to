import { DataTableDemo } from '@/components/custom/proprietaire/data-table'
import { getProprietaire } from '@/data-access/proprietaire/getAll.data.access'
import React from 'react'

export default async function Proprietaire() {
  const owners = await getProprietaire()

  return (
    <main className='px-4 py-2'>
      <DataTableDemo data={owners} />
    </main>
  )
}
