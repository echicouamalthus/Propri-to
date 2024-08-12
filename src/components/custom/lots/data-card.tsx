import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DataCard() {
  return (
    <Card className='px-2 pt-6 border-none'>
      <CardHeader className='grid gap-2 lg:grid-cols-2'>
        <div className='grid gap-2 text-center lg:text-start'>
          <CardTitle>Tous les lots</CardTitle>
          <CardDescription>
            les lots enregistrer avec les montant et leurs description
          </CardDescription>
        </div>
        <Button asChild size='sm' className='ml-auto w-full gap-1 lg:w-auto'>
          <Link href='/dashboard/patrimoine/lots/creation'>
            Ajouter un Bien
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className='grid w-full bg-red-400'>
          <div className='relative lg:h-56'>
            <Image
              priority={true}
              className='absolute h-full w-full object-cover'
              width={900}
              height={900}
              src={
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              alt='lots picture'
            />
            <div className='relative z-0 flex h-full w-full justify-end p-2'>
              <div className='space-y-2 bg-white p-4 lg:w-[600px]'>
                <div className='flex justify-between'>
                  <div>
                    <h3 className='font-mono lg:text-2xl'>
                      Appartement Quasimodo - Clamart
                    </h3>
                    <p className='text-sm text-stone-400'>
                      4 Avenue Victor Hugo, 92140 Clamart
                    </p>
                  </div>
                  <div>
                    <Badge>loué</Badge>
                  </div>
                </div>
                <div className='space-x-2'>
                  <Badge>Appartement</Badge>
                  <Badge>Meublé</Badge>
                </div>
                <div className='grid h-20 grid-cols-2 gap-5'>
                  <div className='lg:text-md flex h-full flex-col justify-center bg-stone-100 p-2 text-center text-xs'>
                    <span className='text-[10px] font-bold lg:text-lg'>
                      1414 $ HC
                    </span>
                    mensuel
                  </div>
                  <div className='lg:text-md flex h-full flex-col justify-center bg-stone-100 p-2 text-center text-xs'>
                    <span className='text-[10px] font-bold lg:text-lg'>75</span>
                    m2(loi carrés)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
