import { TypeTicket } from '@/entites/ticket'
import db from '@/lib/db'

export default async function CreateTicket(ticket: TypeTicket) {
  await db.ticket.create({
    data: ticket
  })
}
