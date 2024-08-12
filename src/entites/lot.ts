import { totalmem } from 'os'
import { z } from 'zod'

export const Lot = z.object({
  type: z.string({
    required_error: 'Veuillez sélectionnez les types affichés'
  }),
  superficie: z.coerce.number({ required_error: 'Veuillez entrez un nombre' }),
  adresse: z
    .string()
    .min(2, { message: 'veuillez entrez une adresse correct' }),
  regime_juridique: z.string({
    required_error: 'Veuillez sélectionnez les régimes affichés'
  }),
  meuble: z.boolean().default(false),
  equipement_privatif: z.array(
    z.string().min(2, { message: 'veuillez entrez une information correct' })
  ),
  equipement_commun: z.array(
    z.string().min(2, { message: 'veuillez entrez une information correct' })
  ),
  total_number: z.coerce.number({ required_error: 'Veuillez entrez un nombre' })
})

export type TLot = z.infer<typeof Lot>
