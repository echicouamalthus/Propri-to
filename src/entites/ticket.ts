import { z } from 'zod'

export const TicketSchema = z.object({
  id: z.string(),
  type_de_demande: z.string().min(1),
  statut: z.string().min(1),
  priority: z.string().min(1),
  description: z.string().nullable(),
  locataireId: z.string(),
  lotId: z.string()
})

export type TypeTicket = z.infer<typeof TicketSchema>
