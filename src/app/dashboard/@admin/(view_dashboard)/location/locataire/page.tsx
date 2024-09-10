import { DataTableDemo } from '@/components/custom/locataire/data-table'
import { GetAllLocataireUseCase } from '@/use-cases/locataire/getAllLocataire.use.case'

export default async function Locataire() {
  const locataire = await GetAllLocataireUseCase()

  return (
    <main className='px-4 py-2'>
      <DataTableDemo data={locataire} />
    </main>
  )
}
