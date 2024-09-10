import { DataTableDemo } from '@/components/custom/reclamation/data-table'
import { GetAllTicketUseCase } from '@/use-cases/ticket/getAllTicket.use.case'
import React from 'react'

export default async function Demande() {
  const ticket = await GetAllTicketUseCase()

  return (
    <div className='px-4 py-2'>
      <DataTableDemo data={ticket} />
    </div>
  )
}
