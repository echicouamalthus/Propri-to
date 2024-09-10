import { getTicket } from '@/data-access/ticket/getAll.data.access'

export async function GetAllTicketUseCase() {
  return getTicket()
}
