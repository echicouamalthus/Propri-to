import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'

export const contactSchema = z.object({
  nom: z.string().min(2, 'veuillez entrez des informations'),
  entreprise: z.string().min(2, 'veuillez entrez des informations'),
  email: z.string().min(2, 'veuillez entrez des informations'),
  phone_number: z
    .string()
    .min(2, 'veuillez entrez des informations')
    .refine(isValidPhoneNumber, {
      message: 'le numéro est invalide'
    }),
  sujet: z.string().min(2, 'veuillez entrez des informations'),
  message: z.string().min(2, 'veuillez entrez des informations')
})

export type TContactShema = z.infer<typeof contactSchema>
