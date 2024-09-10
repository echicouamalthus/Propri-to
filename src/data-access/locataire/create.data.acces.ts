import { TLocataire } from '@/entites/locataire'
import db from '@/lib/db'

export async function CreateLocataire(locataire: TLocataire) {
  await db.locataire.create({
    data: locataire
  })
}