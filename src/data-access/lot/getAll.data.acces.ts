import db from '@/lib/db'

export async function getLots() {
  const lots = await db.lot.findMany({
    include: {
      dossier_de_location: true
    }
  })
  return lots
}
