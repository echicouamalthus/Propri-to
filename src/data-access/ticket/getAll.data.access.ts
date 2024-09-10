import db from '@/lib/db'

export async function getTicket() {
  return await db.ticket.findMany({
    include: {
      locataire: true,
      lot: true
    }
  })
}
