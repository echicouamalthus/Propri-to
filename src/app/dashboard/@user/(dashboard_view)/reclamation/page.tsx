'use client'

import { DataTableDemo } from '@/components/custom/reclamation/data-table'
import { useGetLocator } from '@/lib/hook/use-get-Locator'

export default function Reclamation() {
  const { tenant } = useGetLocator()
  const ticket = tenant?.ticket

  return (
    <div>
      <DataTableDemo data={ticket} />
    </div>
  )
}
