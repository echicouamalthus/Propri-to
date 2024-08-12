'use server'

import { CreateProprietaireUseCase } from '@/use-cases/proprietaire/proprietaire.use.case'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const createProprietaireAction = createServerAction()
  .input(
    z.object({
      nom_complet: z.string().min(1),
      adresse: z.string().min(1),
      telephone: z.string().min(1),
      email: z
        .string()
        .email({ message: 'veuillez entrez un email valide' })
        .min(1),

      option_pay: z.boolean().default(false),

      profession: z.string(),
      nom_contact: z.string(),
      contact: z.string().min(1)
    })
  )
  .handler(async ({ input }) => {
    await CreateProprietaireUseCase(input)
    return redirect('/dashboard/patrimoine/proprietaire')
  })
