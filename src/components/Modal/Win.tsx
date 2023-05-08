import React, { FC, useContext } from 'react'
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
  const user = getFromLocalStorage<UserData>('userData')!
  const { winner, pointsEarned, hideModal, setTheWinner, setPointsEarned } =
    useContext(ModalContext)

  const didIWin = () => winner === user.uid

  const handlePlayAgain = () => {
    router.replace('/queue')
    hideModal()
    setTheWinner('')
    setPointsEarned({})
  }

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
        <Button onClick={handlePlayAgain} type="primary">
          Play again
        </Button>
      </div>
    </div>
  )
}

export default Win
