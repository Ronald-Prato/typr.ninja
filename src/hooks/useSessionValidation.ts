/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { useAppDispatch } from '@/store'
import { setUserData } from '@/store/user/user.dispatchers'
import { useRouter } from 'next/navigation'
import { firebaseApp } from '@/firebase.init'

export const useSessionValidation = () => {
  const auth = getAuth(firebaseApp)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const handleGetUserData = async (uid: string) => {
    setIsLoading(true)
    const response = await fetch(`/api/get-user?uid=${uid}`)
    const { data } = await response.json()

    dispatch(setUserData(data))

    if (!data.nickname) {
      router.replace('/create-user')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && handleGetUserData(user.uid)

      !user && router.replace('/login')
    })
  }, [])

  return { isLoading }
}
