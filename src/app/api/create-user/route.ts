import { SERVER_API_URL } from '@/constants'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const payload = await request.json()
  const res = await fetch(`${SERVER_API_URL}/create-user`, payload)
  return NextResponse.json({ res })
}
