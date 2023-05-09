import { SERVER_API_URL } from '@/constants'
import { NextResponse } from 'next/server'

export async function GET() {
  const user = await fetch(`${SERVER_API_URL}/online-players`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  const data = await user.json()
  
  return NextResponse.json({ data })
}
