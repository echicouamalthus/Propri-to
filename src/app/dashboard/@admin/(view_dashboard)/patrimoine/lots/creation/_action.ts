'use server'

import { CreateLotUseCase } from '@/use-cases/lot/lot.use.case'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const createLotAction = createServerAction()
  .input(
    z.object({
      type: z.string({
        required_error: 'Veuillez sélectionnez les types affichés'
      }),
      superficie: z.coerce.number({
        required_error: 'Veuillez entrez un nombre'
      }),
      adresse: z
        .string()
        .min(2, { message: 'veuillez entrez une adresse correct' }),
      regime_juridique: z.string({
        required_error: 'Veuillez sélectionnez les régimes affichés'
      }),
      meuble: z.boolean().default(false),
      equipement_privatif: z.array(
        z
          .string()
          .min(2, { message: 'veuillez entrez une information correct' })
      ),
      equipement_commun: z.array(
        z
          .string()
          .min(2, { message: 'veuillez entrez une information correct' })
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
      })
    })
  )
  .handler(async ({ input }) => {
    await CreateLotUseCase(input)
    return redirect("/dashboard/patrimoine/lots")
  })
