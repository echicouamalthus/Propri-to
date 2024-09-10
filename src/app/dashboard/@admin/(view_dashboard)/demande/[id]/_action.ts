'use server'

import { TicketSchema } from '@/entites/ticket'
import { UpdateTicketUseCase } from '@/use-cases/ticket/updateTicket.use.case'
import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'

export const UpdateTicketAction = createServerAction()
  .input(TicketSchema)
  .handler(async ({ input }) => {
    await UpdateTicketUseCase(input)
    return redirect('/dashboard/demande')
  })
