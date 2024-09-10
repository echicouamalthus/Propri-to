import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'

export const ProprietaireSchema = z.object({
  nom_complet: z.string().min(1),
  adresse: z.string().min(1),
  telephone: z.string().min(1).refine(isValidPhoneNumber, {
    message: 'le numéro est invalide'
  }),
  email: z
    .string()
    .email({ message: 'veuillez entrez un email valide' })
    .min(1),
  // date_de_naissance: z.date({
  //   required_error: 'la date de naissance est requis'
  // }),

  option_pay: z.boolean().default(false),

  profession: z.string(),
  nom_contact: z.string(),
  contact: z.string().min(1).refine(isValidPhoneNumber, {
    message: 'le numéro est invalide'
  })
})

export type TProprietaire = z.infer<typeof ProprietaireSchema>
