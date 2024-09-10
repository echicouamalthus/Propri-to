import { getLocataire } from '@/data-access/locataire/getAll.data.acces'
import { NextResponse } from 'next/server'

export async function GET() {
  const tenant = await getLocataire()
  return NextResponse.json(tenant)
}
