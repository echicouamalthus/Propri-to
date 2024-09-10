'use server'

import { CreateTicketUseCase } from '@/use-cases/ticket/ticket.use.case'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const ticketAction = createServerAction()
  .input(
    z.object({
      id: z.string(),
      type_de_demande: z.string(),
      statut: z.string(),
      priority: z.string(),
      description: z.string().nullable(),
      locataireId: z.string(),
      lotId: z.string()
    })
  )
  .handler(async ({ input }) => {
    await CreateTicketUseCase(input)
    return redirect('/dashboard/reclamation')
  })
