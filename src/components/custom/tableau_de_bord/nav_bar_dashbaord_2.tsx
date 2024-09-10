'use client'

import LogoSvgIcon from '../../../../public/proprio-to.svg'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useGetLocator } from '@/lib/hook/use-get-Locator'
import { LogOutIcon, MenuIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useClientRole } from '@/lib/hook/use-check-client-role'

export default function NavBarDashbaord_2() {
  const { tenant } = useGetLocator()
  const { verifyRole } = useClientRole()

  return (
    <header className='sticky top-0 flex items-center justify-end gap-5 border-b bg-card px-6 py-4'>
      <div className='hidden w-full items-center justify-between lg:flex'>
        <Link href={'#'} className='flex w-full items-center gap-2'>
          <Image src={LogoSvgIcon} alt='logo SVG' width={40} height={40} />
          <span className='font-mono text-xl font-bold'>Proprio-to</span>
        </Link>
      </div>
      <div className='flex w-full items-center justify-between gap-5 lg:justify-end'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarFallback>
              {tenant?.nom.substring(0, 1)}
              {tenant?.prenom.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className='grid'>
            <div className='text-sm font-medium'>
              {tenant?.nom} {tenant?.prenom}
            </div>
            <div className='text-sm text-muted-foreground'>{tenant?.email}</div>
          </div>
        </div>
        <div className=''>
          <Button
            onClick={() => verifyRole(null)}
            size={'icon'}
            variant={'ghost'}
            className='rounded-full border'
            asChild
          >
            <Link href={'/dashboard'}>
              <LogOutIcon width={20} height={20} />
            </Link>
          </Button>
        </div>
      </div>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='rounded-full'>
            <MenuIcon className='h-5 w-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>
            <Link href='#' className='flex items-center gap-2' prefetch={false}>
              <UserIcon className='h-4 w-4' />
              <span>View Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href='#' className='flex items-center gap-2' prefetch={false}>
              <LogOutIcon className='h-4 w-4' />
              <span>Logout</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </header>
  )
}
