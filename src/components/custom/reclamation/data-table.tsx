'use client'

import * as React from 'react'
import {
  ArrowUpRight,
  Minus,
  MoreHorizontal,
  Plus,
  SquarePen
} from 'lucide-react'
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
import { ArrowUpDown, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { TypeTicket } from '@/entites/ticket'
import { format } from 'date-fns'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import ReclamationForm from './Reclamation-form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Value } from '@radix-ui/react-select'
import { useClientRole } from '@/lib/hook/use-check-client-role'
import { useState } from 'react'
import Link from 'next/link'

// const data: TypeTicket[] = [
//   {
//     type_de_demande: 'réclamation',
//     date_de_creation: '13/09/2023',
//     statut: 'intervention planifié',
//     priority: 'Normal',
//     locataireId: 'BVQ92FVE2LX',
//     lotId: 'KKL03IXP8SJ'
//   },
//   {
//     type_de_demande: 'réparation',
//     date_de_creation: '07/07/2025',
//     statut: 'intervention planifié',
//     priority: 'Non-défini',
//     locataireId: 'PTS09OUX1TC',
//     lotId: 'RCO73ANA4VB'
//   },
//   {
//     type_de_demande: 'autre',
//     date_de_creation: '06/06/2024',
//     statut: '...',
//     priority: 'Moderée',
//     locataireId: 'YFC71NSK9EG',
//     lotId: 'ZEC49YVR7KN'
//   },
//   {
//     type_de_demande: 'autre',
//     date_de_creation: '08/08/2025',
//     statut: 'intervention planifié',
//     priority: 'critique',
//     locataireId: 'MDQ68IED2PI',
//     lotId: 'HYC37SJT8YW'
//   },
//   {
//     type_de_demande: 'réclamation',
//     date_de_creation: '27/03/2024',
//     statut: '...',
//     priority: 'Moderée',
//     locataireId: 'TXW75UQN8EH',
//     lotId: 'QVY00MNK3MC'
//   }
// ]

export function DataTableDemo({ data }: { data: TypeTicket[] }) {
  const { role } = useClientRole()

  const columns: ColumnDef<TypeTicket>[] = [
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
    // }
    {
      accessorKey: 'type_de_demande',
      header: 'type',
      cell: ({ row }) => <Badge> {row.getValue('type_de_demande')}</Badge>
    },
    {
      accessorKey: 'priority',
      header: 'Priorité',
      cell: ({ row }) => (
        <Badge className='lowercase'>{row.getValue('priority')}</Badge>
      )
    },
    // {
    //   accessorKey: 'amount',
    //   header: () => <div className='text-right'>Amount</div>,
    //   cell: ({ row }) => {
    //     const amount = parseFloat(row.getValue('amount'))

    //     // Format the amount as a dollar amount
    //     const formatted = new Intl.NumberFormat('en-US', {
    //       style: 'currency',
    //       currency: 'USD'
    //     }).format(amount)

    //     return <div className='text-right font-medium'>{formatted}</div>
    //   }
    // },
    {
      accessorKey: 'date_de_creation',
      header: () => <div className='text-left'>Date de creation</div>,
      cell: ({ row }) => {
        return (
          <div className='text-left'>
            {format(row.getValue('date_de_creation'), 'dd/MM/yyyy')}
          </div>
        )
      }
    },
    {
      accessorKey: 'statut',
      header: () => (
        <div className={role === 'admin' ? 'text-left' : 'text-right'}>
          Statut
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className={role === 'admin' ? 'text-left' : 'text-right'}>
            {row.getValue('statut') === 'En Attente' ? (
              <p>...</p>
            ) : row.getValue('statut') === 'En Cours' ? (
              <Badge className='bg-orange-200 text-orange-400 hover:bg-inherit'>
                Intervention Planifié
              </Badge>
            ) : (
              <Badge className='bg-green-200 text-green-400'>
                Demande Résolus
              </Badge>
            )}
          </div>
        )
      }
    }
  ]

  if (role === 'admin') {
    columns.push({
      accessorKey: 'locataireId',
      header: () => {
        return <div className='text-left'>Emetteur</div>
      },
      cell: ({ row }) => {
        const nom = row.original.locataire.nom
        const prenom = row.original.locataire.prenom
        return (
          <div className='flex items-center gap-2'>
            <Avatar className='h-8 w-8'>
              <AvatarFallback className='font-semibold uppercase'>
                {nom.substring(0, 1)}
                {prenom.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className='grid'>
              <div className='text-sm font-medium'>{nom}</div>
            </div>
          </div>
        )
      },
      enableHiding: false,
      enableSorting: false
    })

    columns.push({
      accessorKey: 'lotId',
      header: () => {
        return <div className='text-left'>Logement ciblé</div>
      },
      cell: ({ row }) => {
        const nom = row.original.lot.nom_bien
        return <div className='flex items-center gap-2'>{nom}</div>
      },
      enableHiding: false,
      enableSorting: false
    })

    columns.push({
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <Button size='icon' variant={'ghost'} asChild>
            <Link href={`/dashboard/demande/${row.original.id}`}>
              <SquarePen className='h-4 w-4' />
            </Link>
          </Button>
        )
      }
    })
  }

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
          <CardTitle>Les Tickets</CardTitle>
          <CardDescription>
            La liste de tous vos demandes sont répertorié ici.
          </CardDescription>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size='sm' className='ml-auto w-full gap-1 lg:w-auto'>
              <span>Faire un demande</span>
              <ArrowUpRight className='h-4 w-4' />
            </Button>
          </SheetTrigger>
          <ReclamationForm />
        </Sheet>
      </CardHeader>
      <CardContent>
        <div className='w-full'>
          <div className='flex items-center py-4'>
            <Select
              onValueChange={value =>
                table.getColumn('statut')?.setFilterValue(value)
              }
              defaultValue={
                (table.getColumn('statut')?.getFilterValue() as string) ?? ''
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filtrer les status' />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: 'non-Traité', value: 'En Attente' },
                  { label: 'en cours', value: 'En Cours' },
                  { label: 'résolus', value: 'Terminer' }
                ].map(e => {
                  return (
                    <SelectItem
                      key={e.label}
                      value={e.value}
                      className='capitalize'
                    >
                      {e.label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            {/* <Input
              placeholder='Filter emails...'
              value={
                (table.getColumn('email')?.getFilterValue() as string) ?? ''
              }
              onChange={event =>
                table.getColumn('email')?.setFilterValue(event.target.value)
              }
              className='max-w-sm'
            /> */}
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
