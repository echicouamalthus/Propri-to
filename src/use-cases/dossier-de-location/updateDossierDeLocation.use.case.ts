import { updateDossierLocation } from '@/data-access/dossier_de_location/update.data.acess'
import { TDossier_de_locataire } from '@/entites/dossier_de_locataire'

export async function UpdateDossierLocationUseCase(
  dossier: TDossier_de_locataire
) {
  await updateDossierLocation(dossier)
}
