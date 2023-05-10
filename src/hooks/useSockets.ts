'use client'

import { Socket } from 'socket.io-client'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

import { useLocalStorage } from './useLocalStorage'
import { useActionWithinTime } from './useActionWithinTime'

import { UserData } from '@/types/user'
import ModalContext from '@/modal.context'
import { CompleteGameDataProps } from '@/types/game'
import { countPlayersSocket } from '@/sockets/count-players.socket'
import { setIdSocket, gameOverSocket, gameHasStartedSocket } from '@/sockets'

interface SocketHookProps {
  socket: Socket | null
  stateData: CompleteGameDataProps
}

export const useSockets = ({ socket, stateData }: SocketHookProps) => {
  const router = useRouter()
  const { scheduleAction } = useActionWithinTime()
  const { getFromLocalStorage } = useLocalStorage()
  const { setTheWinner, setPointsEarned } = useContext(ModalContext)

  const handleWinner = (
    winner: string,
    pointsEarned: Record<string, string>
  ) => {
    setTheWinner(winner)
    setPointsEarned(pointsEarned)
  }

  useEffect(() => {
    if (!socket) return

    setIdSocket(socket, stateData)
    gameOverSocket(socket, handleWinner)
    gameHasStartedSocket(socket, stateData, (roomId, intervals) =>
      scheduleAction(() => router.push(`/match/${roomId}`), intervals)
    )
    countPlayersSocket(socket, (count: number) => {
      stateData.setThePlayersAmount(count)
    })

    const interval = setInterval(() => {
      const start = Date.now()

      socket.emit('ping', () => {
        const duration = Date.now() - start
        console.log(duration)
        stateData.setPingTime(duration)
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [socket, stateData])

  const putPlayerInQueue = () => {
    const { gameState } = stateData
    const user = getFromLocalStorage<UserData>('userData')!

    socket!.emit('put-player-in-queue', {
      ...gameState,
      elo: user.elo,
      uid: user.uid,
      nickname: user.nickname,
      profilePic: user.profilePic,
    })
  }

  const removePlayerFromQueue = () => {
    const { gameState } = stateData
    const user = getFromLocalStorage<UserData>('userData')!

    socket!.emit('remove-player-from-queue', {
      ...gameState,
      elo: user.elo,
      uid: user.uid,
    })
  }

  const gameOver = (uid: string, roomId: string) => {
    socket!.emit('finished', {
      uid,
      roomId,
    })
  }

  return {
    emitters: {
      gameOver,
      putPlayerInQueue,
      removePlayerFromQueue,
    },
  }
}
