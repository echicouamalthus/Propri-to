import DataTab from '@/components/custom/dossier_de_locataire/data-tabs'
import { GetLocataireByDossierIdUSeCase } from '@/use-cases/locataire/getLocataireByDossierId.use.case'

export default async function DetailsDossier({ params }: any) {
  const locataire = await GetLocataireByDossierIdUSeCase(params.id)

  // console.log(locataire)

  return (
    <div className=''>
      <DataTab data={locataire} />
    </div>
  )
}
