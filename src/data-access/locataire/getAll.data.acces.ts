import { TLocataire } from '@/entites/locataire'
import db from '@/lib/db'

export async function getLocataire() {
  return await db.locataire.findMany()
}
