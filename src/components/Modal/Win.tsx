import React, { FC, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ModalContext from '@/modal.context'
import { RootState, useAppSelector } from '@/store'
import { Button } from '../Button'
import styles from './Modal.module.css'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { UserData } from '@/types/user'

const Win = () => {
  const router = useRouter()
  const { getFromLocalStorage } = useLocalStorage()
  const [isLoading, setIsLoading] = useState(false)
  const user = getFromLocalStorage<UserData>('userData')!
  const { winner, pointsEarned } = useContext(ModalContext)

  const didIWin = () => winner === user.uid

  const handlePlayAgain = () => {
    router.replace('/queue')
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return
    setIsLoading(true)
    router.replace('/queue')
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className={styles.score}>
      <h3
        className={`${styles.scoreTitle} ${
          didIWin() ? styles.textSecondary : styles.textDanger
        } `}
      >
        {didIWin() ? 'You won' : 'You lost'}
      </h3>
      <span className={styles.pointsEarned}>
        {pointsEarned[user.uid]} points
      </span>
      <div className={styles.scoreBtns}>
        <Button
          width={155}
          loading={isLoading}
          onClick={handlePlayAgain}
          type="primary"
        >
          Play again
        </Button>
      </div>
    </div>
  )
}

export default Win
