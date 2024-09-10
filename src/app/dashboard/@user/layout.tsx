import LoginLocataire from '@/components/custom/locataire/LoginLocataire'
import { Toaster } from 'sonner'

export default async function layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <LoginLocataire enfant={children} />
      <Toaster richColors />
    </div>
  )
}
