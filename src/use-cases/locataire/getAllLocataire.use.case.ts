import { getLocataire } from '@/data-access/locataire/getAll.data.acces'

export async function GetAllLocataireUseCase() {
  return getLocataire()
}
