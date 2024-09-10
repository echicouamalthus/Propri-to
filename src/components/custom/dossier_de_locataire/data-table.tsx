'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowUpRight, SquarePen } from 'lucide-react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { TProprietaire } from '@/entites/proprietaire'
import { Badge } from '@/components/ui/badge'
import { TDossier_de_locataire } from '@/entites/dossier_de_locataire'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useServerAction } from 'zsa-react'
import { getLocataireByDossierIdAction } from '@/app/dashboard/@admin/(view_dashboard)/location/dossier-de-location/[id]/_action'
import { useGetLocatorAdmin } from '@/lib/hook/use-get-locator-admin'

// const data: TDossier_de_locataire[] = [
//   {
//     nom_dossier: 'ut odio vel est tempor',
//     etat_locatif: 'ACTIVE',
//     date_de_signature: '06/07/2024',
//     prise_effet: '21/12/2024',
//     date_de_fin: '04/10/2024',
//     language: 'Anglais',
//     clause: '1 mois de loyer',
//     type_de_contrat: 'civil',
//     frequence_de_paiement: 'annuelle',
//     locataireId: 'RUM76MEB7GE',
//     lotId: 'OBE33WJV8VW',
//     jour_de_paiement: '4'
//   },
//   {
//     nom_dossier: 'sed orci lobortis augue scelerisque mollis.',
//     etat_locatif: 'TERMINER',
//     date_de_signature: '28/02/2024',
//     prise_effet: '07/01/2025',
//     date_de_fin: '15/11/2024',
//     language: 'Anglais',
//     clause: '2 mois de loyer',
//     type_de_contrat: 'residence principal',
//     frequence_de_paiement: 'mensuelle',
//     locataireId: 'TUD55RFR4CY',
//     lotId: 'KYU80LPB1VY',
//     jour_de_paiement: '5'
//   },
//   {
//     nom_dossier: 'augue id ante',
//     etat_locatif: 'ACTIVE',
//     date_de_signature: '05/12/2023',
//     prise_effet: '11/02/2024',
//     date_de_fin: '17/11/2024',
//     language: 'Francais',
//     clause: '2 mois de loyer',
//     type_de_contrat: 'logement',
//     frequence_de_paiement: 'annuelle',
//     locataireId: 'CVC25GCD3XN',
//     lotId: 'EQJ21ZHA7LC',
//     jour_de_paiement: '4'
//   },
//   {
//     nom_dossier: 'egestas ligula. Nullam feugiat',
//     etat_locatif: 'ACTIVE',
//     date_de_signature: '26/08/2023',
//     prise_effet: '24/10/2024',
//     date_de_fin: '29/08/2024',
//     language: 'Francais',
//     clause: '2 mois de loyer',
//     type_de_contrat: 'logement',
//     frequence_de_paiement: 'mensuelle',
//     locataireId: 'SPW55VUM6JP',
//     lotId: 'NRN00FUM6IR',
//     jour_de_paiement: '2'
//   },
//   {
//     nom_dossier: 'penatibus et',
//     etat_locatif: 'ACTIVE',
//     date_de_signature: '23/12/2024',
//     prise_effet: '23/07/2025',
//     date_de_fin: '15/06/2025',
//     language: 'Anglais',
//     clause: '2 mois de loyer',
//     type_de_contrat: 'residence principal',
//     frequence_de_paiement: 'annuelle',
//     locataireId: 'WIX26GVW2VF',
//     lotId: 'VYR88VIX6FV',
//     jour_de_paiement: '9'
//   }
// ]

export function DataTableDemo({ data }: { data: TDossier_de_locataire[] }) {
  const { execute } = useServerAction(getLocataireByDossierIdAction)

  const { getAdminTenant } = useGetLocatorAdmin()

  const columns: ColumnDef<TDossier_de_locataire>[] = [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && 'indeterminate')
    //       }
    //       onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label='Select all'
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={value => row.toggleSelected(!!value)}
    //       aria-label='Select row'
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false
    // },
    {
      accessorKey: 'nom_dossier',
      header: ({ column }) => {
        return <div className='text-left'>Nom du Dossier</div>
      },
      cell: ({ row }) => (
        <div className='text-left font-semibold capitalize'>
          {row.getValue('nom_dossier')}
        </div>
      )
    },
    {
      id: 'locataireId',
      header: ({ column }) => {
        return <div className='text-left'>Profils</div>
      },
      cell: ({ row }) => {
        const locataire = row && row.original.locataire
        const lot = row && row.original.lot
        return (
          <div className='flex items-end'>
            <Avatar>
              <AvatarFallback className='font-semibold uppercase'>
                {locataire.nom.substr(0, 1)}
                {locataire.prenom.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className='font-semibold uppercase'>
                {lot.proprietaire.nom_complet.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
        )
      }
    },
    {
      accessorKey: 'etat_locatif',
      header: () => <div className='text-left'>Etat</div>,
      cell: ({ row }) => {
        return (
          <Badge variant={'outline'} className='text-right font-medium'>
            {row.getValue('etat_locatif')}
          </Badge>
        )
      }
    },
    {
      accessorKey: 'prise_effet',
      header: () => <div className='text-right'>Prise de d'effet</div>,
      cell: ({ row }) => {
        return (
          <div className='text-right font-medium'>
            {format(row.getValue('prise_effet'), 'dd/MM/yyyy')}
          </div>
        )
      }
    },
    {
      accessorKey: 'language',
      header: () => <div className='text-right'>langue de communication</div>,
      cell: ({ row }) => {
        return (
          <div className='text-right capitalize'>
            {row.getValue('language')}
          </div>
        )
      }
    },
    {
      id: 'nom_bien',
      header: () => <div className='text-right'>Nom du logement</div>,
      cell: ({ row }) => {
        return (
          <div className='text-right font-medium'>
            {row.original.lot.nom_bien}
          </div>
        )
      }
    },
    {
      id: 'prix',
      header: () => <div className='text-right'>Loyer</div>,
      cell: ({ row }) => {
        const prix = parseFloat(row.original.lot.prix)

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat('ci-CI', {
          style: 'currency',
          currency: 'XOF'
        }).format(prix)

        return <div className='text-right font-medium'>{formatted}</div>
      }
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const dossier = row.original

        return (
          <Button
            size={'icon'}
            variant={"ghost"}
            onClick={async () => {
              const [data, error] = await execute({ dossierId: dossier.id })

              if (data) {
                getAdminTenant(data)
              } else {
                console.log('voici erreur', error)
              }
            }}
          >
            <SquarePen width={16} height={16}/>
          </Button>
          // <DropdownMenu>
          //   <DropdownMenuTrigger asChild>
          //     <Button variant='ghost' className='h-8 w-8 p-0'>
          //       <span className='sr-only'>Open menu</span>
          //       <MoreHorizontal className='h-4 w-4' />
          //     </Button>
          //   </DropdownMenuTrigger>
          //   <DropdownMenuContent align='end'>
          //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
          //     {/* <DropdownMenuItem
          //       onClick={() => navigator.clipboard.writeText(payment.id)}
          //     >
          //       Copy payment ID
          //     </DropdownMenuItem> */}
          //     <DropdownMenuSeparator />
          //     <DropdownMenuItem
          //       onClick={async () => {
          //         const [data, error] = await execute({ dossierId: dossier.id })

          //         if (data) {
          //           getAdminTenant(data)
          //         } else {
          //           console.log('voici erreur', error)
          //         }
          //       }}
          //     >
          //       Modifier le Dossier
          //     </DropdownMenuItem>
          //   </DropdownMenuContent>
          // </DropdownMenu>
        )
      }
    }
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <Card className='border-none'>
      <CardHeader className='grid gap-2 lg:grid-cols-2'>
        <div className='grid gap-2 text-center lg:text-start'>
          <CardTitle>Les Dossiers de Location</CardTitle>
          <CardDescription>
            Les Recents Propriétaire enregistrer.
          </CardDescription>
        </div>
        <Button asChild size='sm' className='ml-auto w-full gap-1 lg:w-auto'>
          <Link href='/dashboard/location/dossier-de-location/creation'>
            Nouveau Dossier de location
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className='w-full'>
          <div className='flex items-center py-4'>
            <Input
              placeholder='Filtrer les noms de dossiers...'
              value={
                (table.getColumn('nom_dossier')?.getFilterValue() as string) ??
                ''
              }
              onChange={event =>
                table
                  .getColumn('nom_dossiers')
                  ?.setFilterValue(event.target.value)
              }
              className='max-w-sm'
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='hidden lg:flex'>
                <Button variant='outline' className='ml-auto'>
                  Filtrer <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {table
                  .getAllColumns()
                  .filter(column => column.getCanHide())
                  .map(column => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className='capitalize'
                        checked={column.getIsVisible()}
                        onCheckedChange={value =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className='cursor-pointer'
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      Aucun resultats.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <div className='flex-1 text-sm text-muted-foreground'>
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            {/* <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
