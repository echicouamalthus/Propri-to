'use server'

import { GetLocataireByDossierIdUSeCase } from '@/use-cases/locataire/getLocataireByDossierId.use.case'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const getLocataireByDossierIdAction = createServerAction()
  .input(
    z.object({
      dossierId: z.string()
    })
  )
  .handler(async ({ input }) => {
    const res = await GetLocataireByDossierIdUSeCase(input.dossierId)
    redirect(`/dashboard/location/dossier-de-location/${input.dossierId}`)
    return res
  })
