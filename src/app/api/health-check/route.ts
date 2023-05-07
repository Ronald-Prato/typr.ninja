import { SERVER_API_URL } from '@/constants'
import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch(`${SERVER_API_URL}`)
  const health = await response.json()

  return NextResponse.json({ health })
}
