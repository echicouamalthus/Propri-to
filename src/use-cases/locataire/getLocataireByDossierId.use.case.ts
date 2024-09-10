import { getLocataireByDossierId } from '@/data-access/locataire/getLocataireByDossierId'

export async function GetLocataireByDossierIdUSeCase(dossierId: string) {
  return getLocataireByDossierId(dossierId)
}
