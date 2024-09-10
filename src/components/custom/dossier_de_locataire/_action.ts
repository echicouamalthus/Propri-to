'use server'

import { UpdateDossierLocationUseCase } from '@/use-cases/dossier-de-location/updateDossierDeLocation.use.case'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const UpdateDossierLocationAction = createServerAction()
  .input(
    z
      .object({
        id: z.string(),
        nom_dossier: z.string().min(2),
        etat_locatif: z.string().min(2),
        date_de_signature: z.coerce.date(),
        prise_effet: z.coerce.date(),
        date_de_fin: z.coerce.date(),
        language: z.string().min(1),
        clause: z.string().min(1),
        type_de_contrat: z.string(),
        jour_de_paiement: z.coerce.string(),
        frequence_de_paiement: z.string().min(2),
        locataireId: z.string(),
        lotId: z.string()
      })
      .refine(data => data.date_de_fin > data.prise_effet, {
        message:
          "La date de fin doit être postérieure à la date de prise d'effet",
        path: ['date_de_fin']
      })
  )
  .handler(async ({ input }) => {
    await UpdateDossierLocationUseCase(input)
    return 'votre demande de modification à été un succès'
  })
