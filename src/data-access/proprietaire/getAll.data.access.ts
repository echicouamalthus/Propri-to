import db from '@/lib/db'

export async function getProprietaire() {
  const owners = await db.proprietaire.findMany()
  return owners
}
