import { SERVER_API_URL } from '@/constants'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const uid = searchParams.get('uid')

  const user = await fetch(`${SERVER_API_URL}/user/${uid}`)
  const data = await user.json()

  return NextResponse.json({ data })
}
