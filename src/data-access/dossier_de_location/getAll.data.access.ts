import db from '@/lib/db'

export async function getDossierDeLocation() {
  return await db.dossier_de_Location.findMany({
    include: {
      locataire: true,
      lot: {
        include: {
          proprietaire: true
        }
      }
    }
  })
}
