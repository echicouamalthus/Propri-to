import { z } from 'zod'

export const LotSchema = z.object({
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
  total_number: z.coerce.number({
    required_error: 'Veuillez entrez un nombre'
  }),
  prix: z.coerce
    .number({ required_error: 'Veuillez entrez un nombre' })
    .min(5, { message: 'veuillez entrez un montant correct' }),
  image: z
    .array(
      z.instanceof(File).refine(file => file.size < 4 * 1024 * 1024, {
        message: 'File size must be less than 4MB'
      })
    )
    .max(1, {
      message: 'Maximum 1 files are allowed'
    })
    .nullable(),
  nom_bien: z
    .string()
    .min(2, { message: 'veuillez entrez une information correct' }),
  proprietaireId: z.string({
    required_error: 'veuillez séelctionnez un propriétaire'
  })
})

export const LotType = z.object({
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
  total_number: z.coerce.number({
    required_error: 'Veuillez entrez un nombre'
  }),
  prix: z.coerce
    .number({ required_error: 'Veuillez entrez un nombre' })
    .min(5, { message: 'veuillez entrez un montant correct' }),
  image: z.string().nullable(),
  nom_bien: z
    .string()
    .min(2, { message: 'veuillez entrez une information correct' }),
  proprietaireId: z.string({
    required_error: 'veuillez séelctionnez un propriétaire'
  }),
})

export type TLotType = z.infer<typeof LotType>
export type TLot = z.infer<typeof LotSchema>
