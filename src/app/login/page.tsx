'use client'
import Image from 'next/image'
import { Button } from '@/components'
import styles from './Login.module.css'
import Logo from '../../assets/logo.png'
import { useAuth } from '@/hooks/useAuth'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LoginPage() {
  const { handleGoogleSignup } = useAuth()

  return (
    <div className={styles.loginContainer}>
      <Image
        className={styles.logoImage}
        src={Logo}
        width={200}
        alt="Typr Ninja Logo"
      />
      <Button type="primary" onClick={handleGoogleSignup}>
        <FontAwesomeIcon icon={faGoogle} /> Login with Google
      </Button>
    </div>
  )
}
