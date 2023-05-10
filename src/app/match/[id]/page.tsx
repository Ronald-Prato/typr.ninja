'use client'

import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import { Modal, OpponentCard } from '@/components'
import styles from './Match.module.css'
import { UserData } from '@/types/user'
import SocketContext from '@/sockets.context'
import { SingleWordStage } from '@/game-stages'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ComposedStage } from '@/game-stages/ComposedStage'
import ModalContext from '@/modal.context'

export default function MatchPage({
  params,
}: {
  params: { id: string; userData: UserData }
}) {
  const router = useRouter()
  const [showGame, setShowGame] = useState(false)
  const { getFromLocalStorage } = useLocalStorage()
  const uid = getFromLocalStorage<UserData>('userData')?.uid
  const { gameData, gameOver, playersInfo } = useContext(SocketContext)
  const [currentStage, setCurrentStage] = useState<'single' | 'composed'>(
    'single'
  )
  const { winner, hideModal, setTheWinner, setPointsEarned } =
    useContext(ModalContext)

  const opponent = playersInfo.find((player) => player.uid !== uid)

  useEffect(() => {
    hideModal()
    setTheWinner('', true)
    setPointsEarned({})
  }, [])

  useEffect(() => {
    if (!gameData.chars.length) {
      router.replace('/queue')
      return
    }

    setShowGame(true)
  }, [gameData])

  const handleGameOver = () => {
    console.log(winner)
    if (!winner) gameOver(uid!, params.id)
  }

  return showGame ? (
    <div className={styles.mainContainer}>
      <div className={styles.opponentCardContainer}>
        <OpponentCard opponent={opponent} />
      </div>

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
  ) : null
}
