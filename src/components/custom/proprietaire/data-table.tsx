'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
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

// const data: TProprietaire[] = [
//   {
//     nom_complet: 'Gareth Abagun',
//     email: 'consectetuer.adipiscing@aol.com',
//     telephone: '+225-02-72-33-18-27',
//     adresse: '770364',
//     option_pay: true,
//     profession: 'At Fringilla Purus Industries',
//     nom_contact: 'Lucian Bruce',
//     contact: '+225-05-70-83-03-75'
//   },
//   {
//     nom_complet: 'Norman Chibuzor',
//     email: 'interdum.feugiat.sed@hotmail.com',
//     telephone: '+225-01-51-50-35-68',
//     adresse: '421156',
//     option_pay: false,
//     profession: 'A Auctor Institute',
//     nom_contact: 'Silas Wilder',
//     contact: '+225-05-73-28-28-17'
//   },
//   {
//     nom_complet: 'Ocean Anjorin',
//     email: 'id.magna.et@yahoo.ca',
//     telephone: '+225-01-93-75-19-49',
//     adresse: '701192',
//     option_pay: false,
//     profession: 'Semper Pretium Neque Corp.',
//     nom_contact: 'Neil Bright',
//     contact: '+225-07-64-68-11-49'
//   },
//   {
//     nom_complet: 'Beck Abagun',
//     email: 'nisi.nibh@icloud.edu',
//     telephone: '+225-06-22-82-93-02',
//     adresse: '817785',
//     option_pay: true,
//     profession: 'Enim Commodo Corp.',
//     nom_contact: 'Carla Bond',
//     contact: '+225-08-97-54-49-56'
//   },
//   {
//     nom_complet: 'Reed Adewusi',
//     email: 'tincidunt.neque.vitae@google.ca',
//     telephone: '+225-01-83-69-47-85',
//     adresse: '367554',
//     option_pay: true,
//     profession: 'Fringilla Est Mauris LLP',
//     nom_contact: 'Alea Atkins',
//     contact: '+225-01-81-81-43-15'
//   }
// ]

export function DataTableDemo({ data }: { data: TProprietaire[] }) {
  const columns: ColumnDef<TProprietaire>[] = [
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
      id: 'avatar',
      cell: ({ row }) => {
        const nom_complet = row.original.nom_complet
        return (
          <Avatar>
            <AvatarFallback className='font-semibold uppercase'>
              {nom_complet.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        )
      },
      enableHiding: false,
      enableSorting: false
    },
    {
      accessorKey: 'nom_complet',
      header: 'Responsable légal ou garant',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('nom_complet')}</div>
      )
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('email')}</div>
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
      accessorKey: 'telephone',
      header: () => (
        <div className='text-left'>Numéro utilisé pour la facturation</div>
      ),
      cell: ({ row }) => {
        return (
          <div className='text-left font-medium'>
            {row.getValue('telephone')}
          </div>
        )
      }
    },
    {
      accessorKey: 'option_pay',
      header: () => <div className='text-right'>Facturant</div>,
      cell: ({ row }) => {
        return (
          <div className='text-right capitalize'>
            {row.getValue('option_pay') ? (
              <Badge className='bg-stone-400'>facturant</Badge>
            ) : (
              <Badge className='bg-stone-400'>non facturant</Badge>
            )}
          </div>
        )
      }
    }
    // {
    //   id: 'actions',
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant='ghost' className='h-8 w-8 p-0'>
    //             <span className='sr-only'>Open menu</span>
    //             <MoreHorizontal className='h-4 w-4' />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align='end'>
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Copy payment ID
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>View customer</DropdownMenuItem>
    //           <DropdownMenuItem>View payment details</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     )
    //   }
    // }
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
          <CardTitle>Les Propriétaires</CardTitle>
          <CardDescription>
            Les Recents Propriétaire enregistrer.
          </CardDescription>
        </div>
        <Button asChild size='sm' className='ml-auto w-full gap-1 lg:w-auto'>
          <Link href='/dashboard/patrimoine/proprietaire/creation'>
            Ajouter un Propriétaire
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className='w-full'>
          <div className='flex items-center py-4'>
            <Input
              placeholder='Filter emails...'
              value={
                (table.getColumn('email')?.getFilterValue() as string) ?? ''
              }
              onChange={event =>
                table.getColumn('email')?.setFilterValue(event.target.value)
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
