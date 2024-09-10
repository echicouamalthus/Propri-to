import { DataTableDemo } from '@/components/custom/dossier_de_locataire/data-table'
import { GetAllDossierUseCase } from '@/use-cases/dossier-de-location/getAlldossier.use.case'

export default async function DossierLocation() {
  const dossier = await GetAllDossierUseCase()

  return (
    <main className='px-4 py-2'>
      <DataTableDemo data={dossier} />
    </main>
  )
}
