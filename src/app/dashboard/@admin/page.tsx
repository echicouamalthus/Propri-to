import React from 'react'
import Link from 'next/link'

import {
  ArrowUpRight,
  CreditCard,
  MousePointerClick,
  Users,
  UserPlus,
  Building,
  Folder,
  FileText
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { GetAllProprietaireUseCase } from '@/use-cases/proprietaire/getAllProprietaire.use.case'
import { GetAllLocataireUseCase } from '@/use-cases/locataire/getAllLocataire.use.case'
import { GetAllDossierUseCase } from '@/use-cases/dossier-de-location/getAlldossier.use.case'

export default async function Gestionnaire() {
  const proprietaire = await GetAllProprietaireUseCase()
  const locataire = await GetAllLocataireUseCase()
  const bail = await GetAllDossierUseCase()
  // console.log(bail.filter(e => e.etat_locatif === 'EN COURS'))

  return (
    <div className='flex w-full flex-col'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
          <Card x-chunk='dashboard-01-chunk-1'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Acteurs</CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                +{locataire.length + proprietaire.length}
              </div>
              <p className='text-xs text-muted-foreground'>Dans le système</p>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-2'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Impayer</CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+12,234</div>
              <p className='text-xs text-muted-foreground'>Pour 2 factures</p>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-3'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Contrats</CardTitle>
              <FileText className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+573</div>
              <p className='text-xs text-muted-foreground'>
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
          <Card className='xl:col-span-2' x-chunk='dashboard-01-chunk-4'>
            <CardHeader className='flex flex-row items-center'>
              <div className='grid gap-2'>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>Les Récents Paiements.</CardDescription>
              </div>
              <Button asChild size='sm' className='ml-auto gap-1'>
                <Link href='#'>
                  Voir Plus
                  <ArrowUpRight className='h-4 w-4' />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contrats</TableHead>
                    <TableHead className='hidden xl:table-column'>
                      Type
                    </TableHead>
                    <TableHead className='hidden xl:table-column'>
                      Status
                    </TableHead>
                    <TableHead className='hidden xl:table-column'>
                      Date
                    </TableHead>
                    <TableHead className='text-right'>Loyer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className='font-medium'>Liam Johnson</div>
                      <div className='hidden text-sm text-muted-foreground md:inline'>
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className='hidden xl:table-column'>
                      Sale
                    </TableCell>
                    <TableCell className='hidden xl:table-column'>
                      <Badge className='text-xs' variant='outline'>
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                      2023-06-23
                    </TableCell>
                    <TableCell className='text-right'>$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className='font-medium'>Olivia Smith</div>
                      <div className='hidden text-sm text-muted-foreground md:inline'>
                        olivia@example.com
                      </div>
                    </TableCell>
                    <TableCell className='hidden xl:table-column'>
                      Refund
                    </TableCell>
                    <TableCell className='hidden xl:table-column'>
                      <Badge className='text-xs' variant='outline'>
                        Declined
                      </Badge>
                    </TableCell>
                    <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                      2023-06-24
                    </TableCell>
                    <TableCell className='text-right'>$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className='font-medium'>Noah Williams</div>
                      <div className='hidden text-sm text-muted-foreground md:inline'>
                        noah@example.com
                      </div>
                    </TableCell>
                    <TableCell className='hidden xl:table-column'>
                      Subscription
                    </TableCell>
                    <TableCell className='hidden xl:table-column'>
                      <Badge className='text-xs' variant='outline'>
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                      2023-06-25
                    </TableCell>
                    <TableCell className='text-right'>$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className='font-medium'>Emma Brown</div>
                      <div className='hidden text-sm text-muted-foreground md:inline'>
                        emma@example.com
                      </div>
                    </TableCell>
                    <TableCell className='hidden xl:table-column'>
                      Sale
                    </TableCell>
                    <TableCell className='hidden xl:table-column'>
                      <Badge className='text-xs' variant='outline'>
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                      2023-06-26
                    </TableCell>
                    <TableCell className='text-right'>$450.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className='font-medium'>Liam Johnson</div>
                      <div className='hidden text-sm text-muted-foreground md:inline'>
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className='hidden xl:table-column'>
                      Sale
                    </TableCell>
                    <TableCell className='hidden xl:table-column'>
                      <Badge className='text-xs' variant='outline'>
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className='hidden md:table-cell lg:hidden xl:table-column'>
                      2023-06-27
                    </TableCell>
                    <TableCell className='text-right'>$550.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-5'>
            <CardHeader>
              <CardTitle className='flex items-center gap-4'>
                <Button size={'icon'} variant={'ghost'}>
                  <MousePointerClick />
                </Button>{' '}
                Action Rapide
              </CardTitle>
            </CardHeader>
            <CardContent className='grid gap-6'>
              <Link
                href={'#'}
                className='flex items-center gap-4 bg-stone-100 p-2'
              >
                <Button size={'icon'} variant={'ghost'}>
                  <Building className='w-5' />
                </Button>{' '}
                <span className='font-meduim'>Ajouter un Patrimoine</span>
              </Link>
              <Link
                href={'#'}
                className='flex items-center gap-4 bg-stone-100 p-2'
              >
                <Button size={'icon'} variant={'ghost'}>
                  <UserPlus className='w-5' />
                </Button>{' '}
                <span className='font-meduim'>Créer un Locataire</span>
              </Link>

              <Link
                href={'#'}
                className='flex items-center gap-4 bg-stone-100 p-2'
              >
                <Button size={'icon'} variant={'ghost'}>
                  <Folder className='w-5' />
                </Button>{' '}
                <span className='font-meduim'>
                  Créer un dossier de location
                </span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
