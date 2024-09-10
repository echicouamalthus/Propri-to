import { getDossierDeLocation } from '@/data-access/dossier_de_location/getAll.data.access'

export async function GetAllDossierUseCase() {
  return getDossierDeLocation()
}
