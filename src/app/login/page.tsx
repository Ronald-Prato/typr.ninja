'use client'

import { Button } from '@/components'
import { useAuth } from '@/hooks/useAuth'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LoginPage() {
  const { handleGoogleSignup } = useAuth()

  return (
    <div>
      <Button type="primary" onClick={handleGoogleSignup}>
        <FontAwesomeIcon icon={faGoogle} /> Login with Google
      </Button>
    </div>
  )
}
