import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(res: NextRequest, { params }: any) {
  const ticket = await db.ticket.findFirst({
    where: {
      id: params.id
    },
    include: {
      locataire: true,
      lot: true
    }
  })

  return NextResponse.json(ticket)
}
