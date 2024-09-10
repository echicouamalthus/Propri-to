'use server'

import { GetLocataireByEmailUseCase } from '@/use-cases/locataire/getLocataireByEmail.use.case'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const connectionAction = createServerAction()
  .input(
    z.object({
      email: z.string().email()
    })
  )
  .handler(async ({ input }) => {
    return await GetLocataireByEmailUseCase(input.email)
  })
