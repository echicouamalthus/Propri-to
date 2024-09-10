'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import { BellIcon, Tags, UserIcon } from 'lucide-react'
import NavBarDashbaord_2 from '@/components/custom/tableau_de_bord/nav_bar_dashbaord_2'
import { useGetLocator } from '@/lib/hook/use-get-Locator'

export default function Locataire() {
  const { tenant } = useGetLocator()
  console.log(tenant)

  return (
    <div>
      <NavBarDashbaord_2 />
      <div className='flex h-full w-full flex-col bg-background'>
        <main className='grid flex-1 grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3'>
          <Card className='flex flex-col items-start justify-between'>
            <CardHeader>
              <CardTitle>Mon Dossier</CardTitle>
              <CardDescription>
                Vérifiez vos informations en tant que locataire.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant='outline'>
                <Link
                  href='/dashboard/mon-dossier'
                  className='flex items-center gap-2'
                  prefetch={false}
                >
                  <UserIcon className='h-4 w-4' />
                  <span>voir plus</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className='flex flex-col items-start justify-between'>
            <CardHeader>
              <CardTitle>Mes Tickets</CardTitle>
              <CardDescription>
                Consultez vos differents réclamations et leurs status
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant='outline'>
                <Link
                  href='/dashboard/reclamation'
                  className='flex items-center gap-2'
                  prefetch={false}
                >
                  <Tags className='h-4 w-4' />
                  <span>voir plus</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quittances de loyer</CardTitle>
              <CardDescription>
                consultez les quittances de loyer ainsi que d&apos;autre...
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant='outline'>
                <Link
                  href='#'
                  className='flex items-center gap-2'
                  prefetch={false}
                >
                  <BellIcon className='h-4 w-4' />
                  <span>Bientôt...</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}
