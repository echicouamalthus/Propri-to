'use client'

import ChangeButton from '@/components/ChangeButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu
} from '@/components/ui/dropdown-menu'
import { useClientRole } from '@/lib/hook/use-check-client-role'
import { format } from 'date-fns'
import {
  Building,
  Calendar,
  HandCoins,
  MoreVertical,
  PencilLine,
  Printer,
  User
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function DataCard({ data }: { data: any }) {
  // console.log(data)

  const { role } = useClientRole()

  return (
    <div className='space-y-8 px-2 pb-4 lg:px-0'>
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div className='flex items-center'>
              <Button variant={'ghost'} className='hover:bg-inherit'>
                <Building className='h-16 w-16' />
              </Button>
              <div className='flex flex-col gap-1'>
                <div className='flex items-start gap-4'>
                  <h2 className='font-mono text-sm lg:text-3xl'>
                    {role === 'user'
                      ? data.dossier_de_Location[0].lot.nom_bien
                      : data.lot.nom_bien}
                  </h2>
                  {data.dossier_de_Location[0].etat_locatif === 'EN ATTENTE' ? (
                    <span className='border border-orange-400 bg-orange-50 px-2 text-orange-400 lg:text-xs'>
                      Entrée
                    </span>
                  ) : data.dossier_de_Location[0].etat_locatif ===
                    'ACTIVE' ? (
                    <span className='border border-green-400 bg-green-50 px-2 text-green-400 lg:text-xs'>
                      Actif
                    </span>
                  ) : (
                    <span className='border border-red-400 bg-red-50 px-2 text-red-400 lg:text-xs'>
                      Terminer
                    </span>
                  )}
                </div>
                <div>
                  <p className='lg:text-md text-sm text-primary/45'>
                    Loué par {`${data.nom.substring(0, 1)}.${data.prenom}`} -
                    Fin prévue pour le{' '}
                    {format(
                      data.dossier_de_Location[0].date_de_fin,
                      'dd/MM/yyyy'
                    )}
                  </p>
                </div>
              </div>
            </div>
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
                    <span>Demander à modifier</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <div className='space-x-2'>
                    <Printer className='h-4 w-4' />
                    <span>Imprimer</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <hr />
        <CardContent className=''>
          <div className='flex flex-wrap items-center gap-2 pt-4'>
            <Badge>Informations du Contrat</Badge>
            <Badge>Quittance (2) </Badge>
            <Badge>Document (0) </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <span className='font-mono text-lg'>Information générales</span>
            {role === 'admin' ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='border'>
                    Action
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem asChild>
                    <div className='space-x-2 text-start'>
                      <span>modifier</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <div className='space-x-2 text-start'>
                      <span>Résilier le contrat</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className='space-y-16'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Building />
              <span>Informations du contrat</span>
            </div>
            <div className='space-y-4'>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Type de contrat</span>
                  <ChangeButton />
                </div>
                <p>{data.dossier_de_Location[0].type_de_contrat}</p>
                <hr />
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Langue de communication</span>
                  <ChangeButton />
                </div>
                <p>{data.dossier_de_Location[0].language}</p>
                <hr />
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Unité</span>
                  <ChangeButton />
                </div>
                <p>{data.dossier_de_Location[0].lot.nom_bien}</p>
                <hr />
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <User />
              <span>Locataire et Garants</span>
            </div>
            <div className='space-y-4'>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Locataire (s)</span>
                  <ChangeButton />
                </div>
                <Link href={'#'} className='p-2 hover:bg-stone-100'>
                  {`${data.nom.substring(0, 1)}.${data.prenom}`}
                  <br />
                  {data.telephone}
                  <br />({data.email})
                </Link>
                <hr />
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Garants</span>
                  <ChangeButton />
                </div>
                <p>
                  Mr(Mlle)
                  {data.dossier_de_Location[0].lot.proprietaire.nom_complet}
                </p>
                <hr />
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Calendar />
              <span>Date clés</span>
            </div>
            <div className='space-y-4'>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Date de Signature</span>
                  <ChangeButton />
                </div>
                <p>
                  {format(
                    data.dossier_de_Location[0].date_de_signature,
                    'dd/MM/yyyy'
                  )}
                </p>
                <hr />
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Date de début</span>
                </div>
                <p>
                  {format(
                    data.dossier_de_Location[0].prise_effet,
                    'dd/MM/yyyy'
                  )}
                </p>
                <hr />
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Date de fin actuelle</span>
                  <ChangeButton />
                </div>
                <p>
                  {format(
                    data.dossier_de_Location[0].date_de_fin,
                    'dd/MM/yyyy'
                  )}
                </p>
                <hr />
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <HandCoins />
              <span>Informations financières</span>
            </div>
            <div className='space-y-4'>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Loyer</span>
                  <ChangeButton />
                </div>
                <p>
                  {new Intl.NumberFormat('ci-CI', {
                    style: 'currency',
                    currency: 'XOF'
                  }).format(data.dossier_de_Location[0].lot.prix)}
                </p>
                <hr />
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Caution</span>
                  <ChangeButton />
                </div>
                <p>{data.dossier_de_Location[0].clause} mois</p>
                <hr />
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Jour de Paiement</span>
                  <ChangeButton />
                </div>
                <p>
                  le {data.dossier_de_Location[0].jour_de_paiement} ième jour de
                  chaque mois
                </p>
                <hr />
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono'>Fréquence de paiement</span>
                  <ChangeButton />
                </div>
                <p>{data.dossier_de_Location[0].frequence_de_paiement}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
