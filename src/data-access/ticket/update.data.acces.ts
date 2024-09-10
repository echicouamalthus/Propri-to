'use server'

import { TypeTicket } from '@/entites/ticket'
import db from '@/lib/db'

export async function updateTicket(ticket: TypeTicket) {
  await db.ticket.update({
    where: {
      id: ticket.id
    },
    data: {
      statut: ticket.statut
    }
  })
}
