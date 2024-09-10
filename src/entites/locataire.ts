import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'

export const LocataireSchema = z.object({
  id: z.string(),
  nom: z.string().min(1),
  prenom: z.string().min(1),
  date_de_naissance: z.date({
    required_error: 'la date de naissance est requis'
  }),
  lieu_de_naissance: z.string().min(1),

  adresse_actuel: z.string().min(1),
  email: z
    .string()
    .email({ message: 'veuillez entrez un email valide' })
    .min(1),
  telephone: z.string().min(1).refine(isValidPhoneNumber, {
    message: 'le numéro est invalide'
  }),

  statu_marital: z.string().min(1),
  total_people: z.coerce.number().default(0),
  type_lot: z.string(),
  pet: z.boolean(),

  statu_pro: z.string().min(1),
  employeur: z.string().min(1)
})

export type TLocataire = z.infer<typeof LocataireSchema>
