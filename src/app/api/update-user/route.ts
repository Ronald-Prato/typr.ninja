import { SERVER_API_URL } from '@/constants'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  const payload = await request.json()
  const res = await fetch(`${SERVER_API_URL}/user/${payload.uid}`, {
    method: 'PUT',
    body: JSON.stringify(payload.data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  return NextResponse.json({ res })
}
