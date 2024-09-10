import { getLots } from '@/data-access/lot/getAll.data.acces'
import { NextResponse } from 'next/server'

export async function GET() {
  const property = await getLots()

  return NextResponse.json(property)
}
