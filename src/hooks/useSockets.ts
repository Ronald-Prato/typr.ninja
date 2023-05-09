'use client'

import { useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useRouter } from 'next/navigation'

import { CompleteGameDataProps } from '@/types/game'
import { setIdSocket, gameHasStartedSocket, gameOverSocket } from '@/sockets'
import { useLocalStorage } from './useLocalStorage'
import { UserData } from '@/types/user'
import { useActionWithinTime } from './useActionWithinTime'
import ModalContext from '@/modal.context'
import { countPlayersSocket } from '@/sockets/count-players.socket'

interface SocketHookProps {
  socket: Socket | null
  stateData: CompleteGameDataProps
}

export const useSockets = ({ socket, stateData }: SocketHookProps) => {
  const router = useRouter()
  const { scheduleAction } = useActionWithinTime()
  const { getFromLocalStorage } = useLocalStorage()
  const { setTheWinner, setPointsEarned, } = useContext(ModalContext)

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
  }, [socket, stateData])

  const putPlayerInQueue = () => {
    const { gameState } = stateData
    const user = getFromLocalStorage<UserData>('userData')!

    socket!.emit('put-player-in-queue', {
      ...gameState,
      elo: user.elo,
      uid: user.uid,
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
