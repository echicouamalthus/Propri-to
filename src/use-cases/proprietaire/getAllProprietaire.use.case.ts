import { getProprietaire } from '@/data-access/proprietaire/getAll.data.access'

export async function GetAllProprietaireUseCase() {
  return await getProprietaire()
}
