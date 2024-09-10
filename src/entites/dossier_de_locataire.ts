import { z } from 'zod'

export const Dossier_de_locataireSchema = z.object({
  id: z.string(),
  nom_dossier: z.string().min(2),
  etat_locatif: z.string().min(2),
  date_de_signature: z.coerce.date(),
  prise_effet: z.coerce.date(),
  date_de_fin: z.coerce.date(),
  language: z.string().min(1),
  clause: z.coerce
    .number()
    .min(1, { message: 'le nombre doit être entre 1 et 5' })
    .max(5, { message: 'le nombre doit être entre 1 et 5' })
    .transform(number => number.toString()),
  type_de_contrat: z.string(),
  jour_de_paiement: z.coerce
    .number()
    .min(1, { message: 'le nombre doit être entre 1 et 30' })
    .max(30, { message: 'le nombre doit être entre 1 et 30' })
    .transform(number => number.toString()),
  frequence_de_paiement: z.string().min(2),
  locataireId: z.string(),
  lotId: z.string()
})
//   .refine(data => data.date_de_fin > data.prise_effet, {
//     message: "La date de fin doit être postérieure à la date de prise d'effet",
//     path: ['date_de_fin']
//   })

export type TDossier_de_locataire = z.infer<typeof Dossier_de_locataireSchema>

export type TData = {
  nom_dossier: string
  locataireId: string
  etat_locatif: string
  prise_effet: Date
  language: string
  locataire: {
    nom: string
    prenom: string
    email: string
    telephone: string
  }
  lot: {
    nom_bien: string
    adresse: string
    proprietaire: {
      nom_complet: string
      contact: string
      telephone: string
    }
  }
}
