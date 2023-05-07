'use client'

import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useRouter } from 'next/navigation'

import { RootState, useAppDispatch, useAppSelector } from '@/store'
import { CompleteGameDataProps } from '@/types/game'
import { setIdSocket, gameHasStartedSocket, gameOverSocket } from '@/sockets'
import { useLocalStorage } from './useLocalStorage'
import { UserData } from '@/types/user'
import { useActionWithinTime } from './useActionWithinTime'

interface SocketHookProps {
  socket: Socket | null
  stateData: CompleteGameDataProps
}

export const useSockets = ({ socket, stateData }: SocketHookProps) => {
  const router = useRouter()
  const { getFromLocalStorage } = useLocalStorage()
  const { scheduleAction } = useActionWithinTime()
  const user = getFromLocalStorage<UserData>('userData')!

  const handleWinner = (
    winner: string,
    pointsEarned: Record<string, string>
  ) => {
    winner === user.uid
      ? alert(`You won! ${pointsEarned[user.uid]}`)
      : alert(`You lost! ${pointsEarned[user.uid]}`)

    router.replace('/queue')
  }

  useEffect(() => {
    if (!socket) return

    setIdSocket(socket, stateData)
    gameOverSocket(socket, handleWinner)
    gameHasStartedSocket(socket, stateData, (roomId, intervals) =>
      scheduleAction(() => router.push(`/match/${roomId}`), intervals)
    )
  }, [socket])

  const putPlayerInQueue = () => {
    const { gameState } = stateData

    socket!.emit('put-player-in-queue', {
      ...gameState,
      elo: user.elo,
      uid: user.uid,
    })
  }

  const removePlayerFromQueue = () => {
    const { gameState } = stateData
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
