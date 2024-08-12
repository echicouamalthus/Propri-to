import { TProprietaire } from '@/entites/proprietaire'
import db from '@/lib/db'

export async function CreateProprietaire(owner: TProprietaire) {
  await db.proprietaire.create({
    data: owner
  })
}
