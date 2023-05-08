import { SERVER_API_URL } from '@/constants'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const payload = await request.json()

  console.log('PAYLOAD ', payload, typeof payload, '\n\n')
  const res = await fetch(`${SERVER_API_URL}/create-user`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  const data = await res.json()

  return NextResponse.json({ data })
}
