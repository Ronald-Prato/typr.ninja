import React, { FC, useContext } from 'react'
import { useRouter } from 'next/navigation'
import ModalContext from '@/modal.context'
import { RootState, useAppSelector } from '@/store'
import { Button } from '../Button'
import styles from './Modal.module.css'

const Win = () => {
  const router = useRouter()
  const user = useAppSelector((state: RootState) => state.user)
  const { winner, pointsEarned } = useContext(ModalContext)

  const didIWin = () => winner === user.uid

  const handlePlayAgain = () => {
    router.replace('/queue')
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
