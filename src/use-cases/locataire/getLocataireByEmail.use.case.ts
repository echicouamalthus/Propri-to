import { getLocataireByEmail } from '@/data-access/locataire/getLocataireByEmail'

export async function GetLocataireByEmailUseCase(email: string) {
  return getLocataireByEmail(email)
}
