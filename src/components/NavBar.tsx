'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import LogoSvgIcon from '../../public/proprio-to.svg'
import { Button } from './ui/button'
import { MenuIcon, X } from 'lucide-react'
import { useBreakpoint } from '@/lib/hook/tailwind'
import clsx from 'clsx'
import { link, Links } from '@/lib/constant/link'

export default function NavBar() {
  const [ouvrir, setOuvrir] = useState(true)
  const desktop = useBreakpoint('md')

  return (
    <nav className='sticky top-0 bg-white'>
      <div className='mx-auto max-w-6xl items-center justify-between space-y-3 p-2 py-2 lg:flex lg:space-y-0'>
        <div className='flex w-full max-w-4xl items-center justify-between'>
          <Link href={'/'} className='flex w-full items-center gap-2'>
            <Image
              src={LogoSvgIcon}
              alt='logo SVG'
              width={desktop ? 60 : 40}
              height={desktop ? 60 : 40}
            />
            <span className='font-mono text-xl font-bold'>Proprio-to</span>
          </Link>

          <div className='flex justify-center lg:block lg:w-full'>
            <ul
              className={clsx(
                'absolute -top-32 left-0 -z-20 flex w-full flex-col gap-4 bg-white p-4 transition-all duration-100 ease-in-out lg:static lg:h-auto lg:flex-row lg:bg-transparent lg:p-0',
                {
                  'top-28': ouvrir === false
                }
              )}
            >
              {Links.map((e: link) => {
                return (
                  <Link
                    key={`${e.label}`}
                    href={e.href}
                    className='underline-offset-4 hover:underline'
                  >
                    {e.label}
                  </Link>
                )
              })}
            </ul>

            <Button
              size={'icon'}
              variant={'ghost'}
              className='block p-0 lg:hidden'
            >
              {!ouvrir ? (
                <X onClick={() => setOuvrir(prevOuvrir => !prevOuvrir)} />
              ) : (
                <MenuIcon
                  onClick={() => setOuvrir(prevOuvrir => !prevOuvrir)}
                />
              )}
            </Button>
          </div>
        </div>

        <div className='flex items-center lg:space-x-4'>
          <Button asChild variant={'link'} className='hidden lg:block'>
            <Link href={'#'}>Prendre un rdv</Link>
          </Button>

          <Button variant={'default'} className='w-full lg:w-auto'>
            <Link href={'/dashboard'}>Essai Gratuit</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
