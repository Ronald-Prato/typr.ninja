import { firebaseApp } from '@/firebase.init'
import { useRouter } from 'next/navigation'

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from 'firebase/auth'
import { useState } from 'react'
import { useAppDispatch } from '@/store'
import { setUserData } from '@/store/user/user.dispatchers'
// import { fetchUserCreation } from '../services/signup'

export const useAuth = () => {
  const auth = getAuth(firebaseApp)
  const router = useRouter()
  const dispatch = useAppDispatch()
  // const { handleSetUserData } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const additionalInfo = getAdditionalUserInfo(result)

      document.cookie = `uid=${user.uid}; path=/;`

      dispatch(
        setUserData({
          uid: user.uid,
          email: user.email!,
        })
      )

      if (additionalInfo?.isNewUser) {
        const response = await fetch('/api/create-user', {
          method: 'POST',
          body: JSON.stringify({
            nickname: '',
            uid: user.uid,
            email: user.email,
          }),
        })

        if (response) {
          setIsLoading(false)
          router.replace('/queue')
        }
      }

      router.replace('/queue')
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  const logout = () => {
    auth.signOut()
    router.replace('/login')
  }

  return { handleGoogleSignup, isLoading, logout }
}
