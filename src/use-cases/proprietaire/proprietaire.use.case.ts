import { CreateProprietaire } from '@/data-access/proprietaire/create.data.access'
import { TProprietaire } from '@/entites/proprietaire'

export async function CreateProprietaireUseCase(owner: TProprietaire) {
  await CreateProprietaire(owner)
}
