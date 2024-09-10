import { createDossierDeLocation } from '@/data-access/dossier_de_location/create.data.access'
import { TDossier_de_locataire } from '@/entites/dossier_de_locataire'

export async function CreateDossierUseCase(dossier: TDossier_de_locataire) {
  await createDossierDeLocation(dossier)
}
