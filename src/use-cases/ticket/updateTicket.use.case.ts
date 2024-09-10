import { updateTicket } from '@/data-access/ticket/update.data.acces'
import { TypeTicket } from '@/entites/ticket'

export async function UpdateTicketUseCase(ticket: TypeTicket) {
  await updateTicket(ticket)
}
