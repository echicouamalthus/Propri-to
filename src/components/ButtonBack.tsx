'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'

export default function ButtonBack() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/dashboard') {
    return null
  }

  return (
    <div className='grid place-content-end px-8 py-2'>
      <Button
        onClick={() => router.back()}
        className='flex items-center border border-red-500 bg-red-500/15 text-red-500 hover:bg-inherit'
      >
        <ChevronLeft />
        <span>retour</span>
      </Button>
    </div>
  )
}
