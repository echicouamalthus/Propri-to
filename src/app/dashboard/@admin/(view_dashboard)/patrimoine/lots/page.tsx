import DataCard from '@/components/custom/lots/data-card'
import { getLots } from '@/data-access/lot/getAll.data.acces'
import { GetAllLotUseCase } from '@/use-cases/lot/getAllLot.use.case'
import React from 'react'

export default async function Logements() {
  const lots = await GetAllLotUseCase()

  return (
    <div className='p-6'>
      <DataCard data={lots} />
    </div>
  )
}
