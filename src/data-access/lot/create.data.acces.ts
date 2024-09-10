import { TLot, TLotType } from '@/entites/lot'
import db from '@/lib/db'

export async function CreateLot(lots: TLotType) {
  await db.lot.create({
    data: lots 
  })
}
