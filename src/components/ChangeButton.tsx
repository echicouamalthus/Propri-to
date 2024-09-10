'use client'

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu
} from '@/components/ui/dropdown-menu'
import { MoreVertical, PencilLine } from 'lucide-react'

import React from 'react'
import { Button } from './ui/button'
import { useClientRole } from '@/lib/hook/use-check-client-role'

export default function ChangeButton() {
  const { role } = useClientRole()

  if (role === 'user') {
    return
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' aria-label='More options'>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem asChild>
          <div className='space-x-2'>
            <PencilLine className='h-4 w-4' />
            <span>modifier</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
