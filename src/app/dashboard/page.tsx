import db from '@/lib/db'
import { Todo } from '@prisma/client'
import React from 'react'

export default async function Dashboard() {
  const getTodo = await db.todo.findMany()

  return (
    <div>
      {getTodo.map((e: Todo) => {
        return <li key={e.id}>{e.text}</li>
      })}
    </div>
  )
}
