import db from '@/lib/db'

export async function getLocataireByDossierId(dossierId: string) {
  return db.dossier_de_Location.findUnique({
    where: {
      id: dossierId
    },
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
