'use client'

import { connectionAction } from '@/app/dashboard/@user/_action'
import { useServerAction } from 'zsa-react'
import { LoginForm } from './LoginForm'
import { useGetLocator } from '@/lib/hook/use-get-Locator'

export default function LoginLocataire({
  enfant
}: {
  enfant: React.ReactNode
}) {
  const { tenant } = useGetLocator()

  return (
    <main>
      {tenant === null || tenant === undefined ? <LoginForm /> : enfant}
    </main>
  )
}
