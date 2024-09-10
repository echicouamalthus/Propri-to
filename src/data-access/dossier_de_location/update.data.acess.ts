import { TDossier_de_locataire } from '@/entites/dossier_de_locataire'
import db from '@/lib/db'

export async function updateDossierLocation(dossier: TDossier_de_locataire) {
  await db.dossier_de_Location.update({
    where: {
      id: dossier.id
    },
    data: dossier
  })
}
