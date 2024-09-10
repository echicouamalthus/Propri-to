import { getLots } from '@/data-access/lot/getAll.data.acces'

export async function GetAllLotUseCase() {
  return await getLots()
}
