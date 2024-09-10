import db from '@/lib/db'

export async function getLocataireByEmail(email: string) {
  return db.locataire.findUnique({
    where: {
      email
    },
    include: {
      dossier_de_Location: {
        include: {
          lot: {
            include: {
              proprietaire: true
            }
          }
        }
      },
      ticket: true
    }
  })
}
