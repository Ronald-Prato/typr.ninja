'use client'

import { useContext, useState } from 'react'

import { Modal } from '@/components'
import styles from './Match.module.css'
import { UserData } from '@/types/user'
import SocketContext from '@/sockets.context'
import { SingleWordStage } from '@/game-stages'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ComposedStage } from '@/game-stages/ComposedStage'

export default function MatchPage({
  params,
}: {
  params: { id: string; userData: UserData }
}) {
  const { getFromLocalStorage } = useLocalStorage()
  const { gameData, gameOver } = useContext(SocketContext)
  const uid = getFromLocalStorage<UserData>('userData')!.uid

  const [currentStage, setCurrentStage] = useState<'single' | 'composed'>(
    'single'
  )

  const handleGameOver = () => {
    gameOver(uid, params.id)
  }

  return (
    <div className={styles.mainContainer}>
      {currentStage === 'single' && (
        <SingleWordStage
          onFinish={() => setCurrentStage('composed')}
          words={gameData.singleWords}
          chars={gameData.chars}
        />
      )}

      {currentStage === 'composed' && (
        <ComposedStage onFinish={handleGameOver} sentence={gameData.sentence} />
      )}

      <Modal />
    </div>
  )
}
