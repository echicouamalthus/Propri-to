import CreateTicket from '@/data-access/ticket/create.data.access'
import { TypeTicket } from '@/entites/ticket'

export async function CreateTicketUseCase(ticket: TypeTicket) {
  await CreateTicket(ticket)
}
