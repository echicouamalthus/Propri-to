import { CreateLot } from "@/data-access/lot/create.data.acces";
import { TLotType } from "@/entites/lot";

export async function CreateLotUseCase(lot: TLotType) {
    await CreateLot(lot)
}