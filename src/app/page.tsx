'use client'
import { useEffect } from 'react'
import '../firebase.init'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/queue')
  }, [])

  return <></>
}
