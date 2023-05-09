import React, { createContext, useEffect, useState } from 'react'
import { useSockets } from './hooks/useSockets'
import { useSocketIO } from './hooks/useSocketIO'
import {
  CompleteGameDataProps,
  GameDataProps,
  SocketStateProps,
} from './types/game'

type QueueProps = {
  playersAmount: number
  putPlayerInQueue: () => void
  removePlayerFromQueue: () => void
  setThePlayersAmount: (amount: number) => void
  gameOver: (uid: string, roomId: string) => void
}

type ComposedSocketContextProps = CompleteGameDataProps & QueueProps

const SocketContext = createContext<ComposedSocketContextProps>(
  {} as ComposedSocketContextProps
)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useSocketIO()
  const [state, setState] = useState<SocketStateProps>({
    socketId: '',
    roomId: '',
  })

  const [gameData, setGameData] = useState<GameDataProps>({
    chars: [],
    sentence: '',
    singleWords: [],
    startIntervalCeil: -1,
    startIntervalFloor: -1,
  })

  const [playersAmount, setPlayersAmount] = useState(0)

  
  const setThePlayersAmount = (amount: number) => setPlayersAmount(amount)


  const setSocketId = (socketId: string) => {
    setState((prev) => ({ ...prev, socketId }))
  }

  const setNewGameData = (newGameData: GameDataProps) => {
    console.log('SETTING GAME DATA ', newGameData)
    setGameData(newGameData)
  }

  const setRoomId = (newRoomId: string) => {
    setState((prev) => ({ ...prev, roomId: newRoomId }))
  }

  const completeGameData: CompleteGameDataProps = {
    gameState: state,
    gameData,
    playersAmount,
    setRoomId,
    setSocketId,
    setNewGameData,
    setThePlayersAmount,
  }

  const { emitters } = useSockets({ socket, stateData: completeGameData })
  const { putPlayerInQueue, removePlayerFromQueue, gameOver } = emitters

  return (
    <SocketContext.Provider
      value={{
        ...completeGameData,
        gameOver,
        putPlayerInQueue,
        removePlayerFromQueue,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext
