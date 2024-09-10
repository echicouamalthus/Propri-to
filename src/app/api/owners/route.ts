import { getProprietaire } from '@/data-access/proprietaire/getAll.data.access'
import { NextResponse } from 'next/server'

export async function GET() {
  const owners = await getProprietaire()

  return NextResponse.json(owners)
}
