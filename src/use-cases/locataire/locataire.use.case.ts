import { CreateLocataire } from '@/data-access/locataire/create.data.acces'
import { TLocataire } from '@/entites/locataire'

export async function CreateLocataireUseCase(locataire: TLocataire) {
  await CreateLocataire(locataire)
}
